from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

username = "lacaso"
password = "1234"

@app.route("/", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        try:
            input_username = request.form["username"]
            input_password = request.form["password"]

            if input_username == username and input_password == password:
                return redirect(url_for("success"))
            else:
                return "Waa khalad"  # Falsche Anmeldedaten
        
        except KeyError:
            return "Fehler: Formularfeld fehlt"
    
    return render_template("login.html")

@app.route("/success")
def success():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
