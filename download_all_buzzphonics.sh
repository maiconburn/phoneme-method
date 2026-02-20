#!/bin/bash

TARGET_DIR="client/public/audio/phonics/en-GB"
mkdir -p "$TARGET_DIR"

echo "Downloading a.m4a..."
curl -s -o "$TARGET_DIR/a.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/a.m4a"
ffmpeg -y -i "$TARGET_DIR/a.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/A.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/a.m4a"

echo "Downloading ai.m4a..."
curl -s -o "$TARGET_DIR/ai.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/ai.m4a"
ffmpeg -y -i "$TARGET_DIR/ai.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/AI.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/ai.m4a"

echo "Downloading air.m4a..."
curl -s -o "$TARGET_DIR/air.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/air.m4a"
ffmpeg -y -i "$TARGET_DIR/air.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/AIR.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/air.m4a"

echo "Downloading ar.m4a..."
curl -s -o "$TARGET_DIR/ar.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/ar.m4a"
ffmpeg -y -i "$TARGET_DIR/ar.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/AR.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/ar.m4a"

echo "Downloading b.m4a..."
curl -s -o "$TARGET_DIR/b.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/b.m4a"
ffmpeg -y -i "$TARGET_DIR/b.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/B.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/b.m4a"

echo "Downloading c.m4a..."
curl -s -o "$TARGET_DIR/c.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/c.m4a"
ffmpeg -y -i "$TARGET_DIR/c.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/C.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/c.m4a"

echo "Downloading ch.m4a..."
curl -s -o "$TARGET_DIR/ch.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/ch.m4a"
ffmpeg -y -i "$TARGET_DIR/ch.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/CH.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/ch.m4a"

echo "Downloading d.m4a..."
curl -s -o "$TARGET_DIR/d.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/d.m4a"
ffmpeg -y -i "$TARGET_DIR/d.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/D.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/d.m4a"

echo "Downloading e.m4a..."
curl -s -o "$TARGET_DIR/e.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/e.m4a"
ffmpeg -y -i "$TARGET_DIR/e.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/E.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/e.m4a"

echo "Downloading ear.m4a..."
curl -s -o "$TARGET_DIR/ear.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/ear.m4a"
ffmpeg -y -i "$TARGET_DIR/ear.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/EAR.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/ear.m4a"

echo "Downloading ee.m4a..."
curl -s -o "$TARGET_DIR/ee.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/ee.m4a"
ffmpeg -y -i "$TARGET_DIR/ee.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/EE.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/ee.m4a"

echo "Downloading er.m4a..."
curl -s -o "$TARGET_DIR/er.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/er.m4a"
ffmpeg -y -i "$TARGET_DIR/er.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/ER.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/er.m4a"

echo "Downloading f.m4a..."
curl -s -o "$TARGET_DIR/f.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/f.m4a"
ffmpeg -y -i "$TARGET_DIR/f.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/F.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/f.m4a"

echo "Downloading g.m4a..."
curl -s -o "$TARGET_DIR/g.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/g.m4a"
ffmpeg -y -i "$TARGET_DIR/g.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/G.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/g.m4a"

echo "Downloading h.m4a..."
curl -s -o "$TARGET_DIR/h.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/h.m4a"
ffmpeg -y -i "$TARGET_DIR/h.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/H.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/h.m4a"

echo "Downloading i.m4a..."
curl -s -o "$TARGET_DIR/i.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/i.m4a"
ffmpeg -y -i "$TARGET_DIR/i.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/I.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/i.m4a"

echo "Downloading igh.m4a..."
curl -s -o "$TARGET_DIR/igh.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/igh.m4a"
ffmpeg -y -i "$TARGET_DIR/igh.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/IGH.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/igh.m4a"

echo "Downloading j.m4a..."
curl -s -o "$TARGET_DIR/j.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/j.m4a"
ffmpeg -y -i "$TARGET_DIR/j.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/J.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/j.m4a"

echo "Downloading l.m4a..."
curl -s -o "$TARGET_DIR/l.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/l.m4a"
ffmpeg -y -i "$TARGET_DIR/l.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/L.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/l.m4a"

echo "Downloading m.m4a..."
curl -s -o "$TARGET_DIR/m.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/m.m4a"
ffmpeg -y -i "$TARGET_DIR/m.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/M.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/m.m4a"

echo "Downloading n.m4a..."
curl -s -o "$TARGET_DIR/n.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/n.m4a"
ffmpeg -y -i "$TARGET_DIR/n.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/N.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/n.m4a"

echo "Downloading ng.m4a..."
curl -s -o "$TARGET_DIR/ng.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/ng.m4a"
ffmpeg -y -i "$TARGET_DIR/ng.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/NG.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/ng.m4a"

echo "Downloading o.m4a..."
curl -s -o "$TARGET_DIR/o.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/o.m4a"
ffmpeg -y -i "$TARGET_DIR/o.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/O.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/o.m4a"

echo "Downloading oa.m4a..."
curl -s -o "$TARGET_DIR/oa.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/oa.m4a"
ffmpeg -y -i "$TARGET_DIR/oa.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/OA.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/oa.m4a"

echo "Downloading oi.m4a..."
curl -s -o "$TARGET_DIR/oi.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/oi.m4a"
ffmpeg -y -i "$TARGET_DIR/oi.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/OI.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/oi.m4a"

echo "Downloading oo.m4a..."
curl -s -o "$TARGET_DIR/oo.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/oo.m4a"
ffmpeg -y -i "$TARGET_DIR/oo.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/OO.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/oo.m4a"

echo "Downloading ooo.m4a..."
curl -s -o "$TARGET_DIR/ooo.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/ooo.m4a"
ffmpeg -y -i "$TARGET_DIR/ooo.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/OOO.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/ooo.m4a"

echo "Downloading or.m4a..."
curl -s -o "$TARGET_DIR/or.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/or.m4a"
ffmpeg -y -i "$TARGET_DIR/or.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/OR.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/or.m4a"

echo "Downloading ow.m4a..."
curl -s -o "$TARGET_DIR/ow.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/ow.m4a"
ffmpeg -y -i "$TARGET_DIR/ow.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/OW.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/ow.m4a"

echo "Downloading p.m4a..."
curl -s -o "$TARGET_DIR/p.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/p.m4a"
ffmpeg -y -i "$TARGET_DIR/p.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/P.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/p.m4a"

echo "Downloading qu.m4a..."
curl -s -o "$TARGET_DIR/qu.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/qu.m4a"
ffmpeg -y -i "$TARGET_DIR/qu.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/QU.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/qu.m4a"

echo "Downloading r.m4a..."
curl -s -o "$TARGET_DIR/r.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/r.m4a"
ffmpeg -y -i "$TARGET_DIR/r.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/R.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/r.m4a"

echo "Downloading s.m4a..."
curl -s -o "$TARGET_DIR/s.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/s.m4a"
ffmpeg -y -i "$TARGET_DIR/s.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/S.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/s.m4a"

echo "Downloading sh.m4a..."
curl -s -o "$TARGET_DIR/sh.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/sh.m4a"
ffmpeg -y -i "$TARGET_DIR/sh.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/SH.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/sh.m4a"

echo "Downloading t.m4a..."
curl -s -o "$TARGET_DIR/t.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/t.m4a"
ffmpeg -y -i "$TARGET_DIR/t.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/T.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/t.m4a"

echo "Downloading th.m4a..."
curl -s -o "$TARGET_DIR/th.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/th.m4a"
ffmpeg -y -i "$TARGET_DIR/th.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/TH.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/th.m4a"

echo "Downloading u.m4a..."
curl -s -o "$TARGET_DIR/u.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/u.m4a"
ffmpeg -y -i "$TARGET_DIR/u.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/U.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/u.m4a"

echo "Downloading ur.m4a..."
curl -s -o "$TARGET_DIR/ur.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/ur.m4a"
ffmpeg -y -i "$TARGET_DIR/ur.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/UR.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/ur.m4a"

echo "Downloading ure.m4a..."
curl -s -o "$TARGET_DIR/ure.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/ure.m4a"
ffmpeg -y -i "$TARGET_DIR/ure.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/URE.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/ure.m4a"

echo "Downloading v.m4a..."
curl -s -o "$TARGET_DIR/v.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/v.m4a"
ffmpeg -y -i "$TARGET_DIR/v.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/V.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/v.m4a"

echo "Downloading w.m4a..."
curl -s -o "$TARGET_DIR/w.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/w.m4a"
ffmpeg -y -i "$TARGET_DIR/w.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/W.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/w.m4a"

echo "Downloading x.m4a..."
curl -s -o "$TARGET_DIR/x.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/x.m4a"
ffmpeg -y -i "$TARGET_DIR/x.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/X.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/x.m4a"

echo "Downloading y.m4a..."
curl -s -o "$TARGET_DIR/y.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/y.m4a"
ffmpeg -y -i "$TARGET_DIR/y.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/Y.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/y.m4a"

echo "Downloading z.m4a..."
curl -s -o "$TARGET_DIR/z.m4a" "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds/z.m4a"
ffmpeg -y -i "$TARGET_DIR/z.m4a" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/Z.mp3" > /dev/null 2>&1
rm "$TARGET_DIR/z.m4a"

