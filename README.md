# PETSCII
An ASCII adventure about taking care of a mysterious pet!

You can play the game on [itch.io](https://chailotl.itch.io/petscii)

# Local Testing

Because Javascript from the browser cannot fetch local files, it is necessary to host a webserver to test locally. Below I have detailed the easiest and fastest way.

Install any version of Python and execute the appropriate command in the project directory:
```bash
# Python 2
python -m SimpleHTTPServer 8000
# Python 3
python -m http.server 8000
```
Then navigate to `127.0.0.1:8000` in your browser.
