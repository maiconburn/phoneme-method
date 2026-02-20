import https from 'https';
import fs from 'fs';

const url = 'https://api.github.com/repos/hellodeborahuk/buzzphonics/contents/public/sounds';
const options = {
    headers: { 'User-Agent': 'node.js' }
};

https.get(url, options, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        const files = JSON.parse(data);
        let script = '#!/bin/bash\n\nTARGET_DIR="client/public/audio/phonics/en-GB"\nmkdir -p "$TARGET_DIR"\n\n';
        
        files.forEach(file => {
            if (file.name.endsWith('.m4a')) {
                const nameWithoutExt = file.name.replace('.m4a', '');
                // Convert to uppercase for filename consistency in our app?
                // Actually, let's keep them Lowercase or Uppercase?
                // Our app expects Uppercase for single letters.
                // But for digraphs like 'ai', 'ee', maybe lowercase is better?
                // Let's lowercase everything for consistency with the repo, 
                // and update our app to handle case insensitive lookup.
                // BUT current app expects A.mp3.
                // So single letters -> Uppercase. Multi -> Lowercase?
                // Or just Uppercase EVERYTHING? 'AI.mp3', 'CH.mp3'.
                // Let's UPPERCASE everything.
                
                const destName = nameWithoutExt.toUpperCase() + '.mp3';
                const sourceUrl = file.download_url;
                
                script += `echo "Downloading ${file.name}..."\n`;
                script += `curl -s -o "$TARGET_DIR/${file.name}" "${sourceUrl}"\n`;
                script += `ffmpeg -y -i "$TARGET_DIR/${file.name}" -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,afade=t=in:ss=0:d=0.15,highpass=f=200,lowpass=f=7000" -acodec libmp3lame -q:a 2 "$TARGET_DIR/${destName}" > /dev/null 2>&1\n`;
                script += `rm "$TARGET_DIR/${file.name}"\n\n`;
            }
        });
        
        fs.writeFileSync('download_all_buzzphonics.sh', script);
        console.log('Generated download_all_buzzphonics.sh');
    });
}).on('error', (e) => {
    console.error(e);
});
