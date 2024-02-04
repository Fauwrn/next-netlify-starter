# Obscurum-Sonus-Instrumentum-Tenebrarum-Attrahens
Deliberatly obscure sound instrument - chaotic attractor

This uses webgl and has been tested and optimised for use in safari. 
If using chrome, make sure you have hardware acceleration turned on (you can test here: https://get.webgl.org/).

Intended to be used at full window size.

Instructions are simple:
1. Click anywhere to enable audio.
2. Press space to randomise the text and audiofile used.
3. Use the arrow keys to control the chaotic attractor. Up/Down effects speed. L/R effects attraction force.
4. hover over words to trigger the samples.

If at anytime you encounter an error, or the program ceases to work, refresh the page.

Using your own audio files
If you have your own audio files that you would like to use, add them to assets/audio/ and follow the naming convention.
Note that the program is currenty set up to only use wav files. If you wish to use an alternative format (mp3,ogg) you must change the text in line 54 - '.wav' to the correct file type you wish to use. You must then update the file count variable to
the number of audio files available.

Link to google drive folder w/ video:
https://drive.google.com/drive/folders/1NBDt_evjv1_J7BcmmEpuVB8Cftsc0lS2?usp=sharing