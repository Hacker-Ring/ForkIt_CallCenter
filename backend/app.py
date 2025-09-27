from flask import Flask, send_from_directory
import os

# point Flask static folder to React build
app = Flask(__name__, static_folder=r"D:\Visual studio code\project\Fork it\frontend\dist", static_url_path="")

# serve React index.html for root
@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

# serve static files (CSS, JS, images, etc.)
@app.route("/<path:path>")
def serve_file(path):
    file_path = os.path.join(app.static_folder, path)
    if os.path.isfile(file_path):
        return send_from_directory(app.static_folder, path)
    else:
        # for React Router, fallback to index.html
        return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    app.run(debug=True)
