"""Generate the AI interviewer's portrait and video loops with the Agnes AI API.

Run this once on your own computer. It is a developer tool, not part of the website.
The API key is read from the AGNES_API_KEY environment variable and is never written
to any file, so nothing secret ends up in the repository or the front end.

Output (served as static files by the site):
    assets/interviewer/portrait.png   still image, also the poster while videos load
    assets/interviewer/idle.mp4       listening loop (blinks, small nods)
    assets/interviewer/talk.mp4       speaking loop (mouth moves), played while the question is read aloud
    assets/interviewer/portrait.json  the portrait's hosted URL (needed by step 2)

Usage (Windows PowerShell):
    $env:AGNES_API_KEY = "your key"
    python tools/gen_interviewer.py image      # step 1: re-run until you like the portrait
    python tools/gen_interviewer.py video      # step 2: make both loops from that portrait
    python tools/gen_interviewer.py video talk # remake only one loop

Both loops start AND end on the same portrait frame (first_frame = last_frame), so they
loop without a visible jump and the page can switch between them smoothly.

Standard library only: no pip install needed.
"""

import json
import os
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

BASE = "https://apihub.agnes-ai.com"
IMAGE_MODEL = "agnes-image-2.5-flash"   # currently free
VIDEO_MODEL = "agnes-video-2.5-flash"   # currently free; 720P only
RATIO = "4:3"                            # same ratio as the camera tile on the page
OUT = Path(__file__).resolve().parent.parent / "assets" / "interviewer"

# A fictional person. Edit this to change the interviewer's look.
PORTRAIT_PROMPT = (
    "Photorealistic webcam video-call frame of a fictional professional job interviewer, "
    "East Asian woman in her late 30s, shoulder-length dark hair, navy blazer over a white blouse, "
    "friendly but focused neutral expression, mouth closed, looking straight into the camera, "
    "head and shoulders centered with some space above the head, sitting at a desk in a bright modern office, "
    "softly blurred background with a plant and a window, soft natural daylight, eye-level laptop webcam angle, "
    "realistic skin texture, no text, no logos, no watermark"
)

CLIPS = {
    "idle": (
        "The interviewer listens attentively to a candidate on a video call: natural blinking, "
        "small slow nods, slight breathing movement, mouth stays closed, keeps eye contact with the camera. "
        "Static camera, no zoom, no camera movement, no cuts. Returns to the exact starting pose at the end."
    ),
    "talk": (
        "The interviewer calmly asks a question on a video call: lips and jaw move naturally as if speaking, "
        "natural blinking, subtle head movement and a light eyebrow raise, keeps eye contact with the camera. "
        "Static camera, no zoom, no camera movement, no cuts, no hand gestures covering the face. "
        "Returns to the exact starting pose with mouth closed at the end."
    ),
}
CLIP_SECONDS = "6"   # "4" to "12"


def api(method, url, body=None, timeout=360):
    key = os.environ.get("AGNES_API_KEY")
    if not key:
        sys.exit("Set the AGNES_API_KEY environment variable first.")
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method, headers={
        "Authorization": "Bearer " + key,
        "Content-Type": "application/json",
    })
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        hint = {401: "invalid API key", 402: "no balance / no access to this model",
                429: "rate limit, wait a minute and retry", 400: "bad parameters"}.get(e.code, "")
        sys.exit(f"HTTP {e.code} {hint}\n{e.read().decode(errors='replace')}")


def download(url, path):
    req = urllib.request.Request(url, headers={"User-Agent": "gen-interviewer"})
    with urllib.request.urlopen(req, timeout=300) as r:
        path.write_bytes(r.read())
    print(f"saved {path.relative_to(OUT.parent.parent)} ({path.stat().st_size // 1024} KB)")


def make_image():
    print("Generating portrait...")
    res = api("POST", BASE + "/v1/images/generations", {
        "model": IMAGE_MODEL,
        "prompt": PORTRAIT_PROMPT,
        "size": "1K",                       # 1152x864 at 4:3
        "ratio": RATIO,
        "extra_body": {"response_format": "url"},
    })
    url = res["data"][0]["url"]
    OUT.mkdir(parents=True, exist_ok=True)
    download(url, OUT / "portrait.png")
    (OUT / "portrait.json").write_text(json.dumps({"url": url, "prompt": PORTRAIT_PROMPT}, indent=2))
    print("Open assets/interviewer/portrait.png. Not happy? Run 'image' again. Happy? Run 'video'.")


def make_clip(name, image_url):
    print(f"Generating '{name}' loop (this can take a few minutes)...")
    task = api("POST", BASE + "/v1/videos", {
        "model": VIDEO_MODEL,
        "prompt": CLIPS[name],
        "mode": "keyframe",
        "first_frame": image_url,
        "last_frame": image_url,          # same frame at both ends = seamless loop
        "seconds": CLIP_SECONDS,
        "size": "720P",
        "aspect_ratio": RATIO,
    })
    vid = task["video_id"]
    poll = f"{BASE}/agnesapi?video_id={vid}&model_name={VIDEO_MODEL}"
    started = time.time()
    while True:
        time.sleep(3)
        st = api("GET", poll, timeout=60)
        status = st.get("status")
        print(f"  {name}: {status} {st.get('progress', 0)}%  ({int(time.time() - started)} s)")
        if status == "completed":
            download(st["url"], OUT / f"{name}.mp4")
            return
        if status == "failed":
            sys.exit(f"'{name}' failed: {(st.get('error') or {}).get('message')}")
        if time.time() - started > 1200:
            sys.exit(f"'{name}' timed out. Task id: {vid}")


def make_videos(only=None):
    meta = OUT / "portrait.json"
    if not meta.exists():
        sys.exit("Run 'image' first.")
    url = json.loads(meta.read_text())["url"]
    for name in ([only] if only else CLIPS):
        if name not in CLIPS:
            sys.exit(f"Unknown clip '{name}'. Choose from: {', '.join(CLIPS)}")
        make_clip(name, url)
    print("Done. Reload the interview page to see the interviewer.")
    print("If the portrait URL has expired (HTTP 400/404 here), run 'image' again, then 'video'.")


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else ""
    if cmd == "image":
        make_image()
    elif cmd == "video":
        make_videos(sys.argv[2] if len(sys.argv) > 2 else None)
    else:
        print(__doc__)
