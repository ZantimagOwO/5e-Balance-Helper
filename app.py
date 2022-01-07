import sqlite3

from flask import Flask, render_template, request

from helpers import calculatePB, calculateDC, calculate_def_CR, calculate_off_CR, c, not_neg


app = Flask(__name__)

app.config["TEMPLATES_AUTO_RELOAD"] = True

if __name__ == '__main__':
    app.run(host='0.0.0.0')


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/CR", methods=["POST"])
def CR():

    # Defensive CR
    AC = c(request.form["AC"])

    HP = c(request.form["HP"])

    DCR = not_neg(calculate_def_CR(HP, AC))

    # Offensive CR
    DPR = (request.form["DPR"])

    DPR = c(DPR)

    AB = c(request.form["AB"])

    OCR = not_neg(calculate_off_CR(DPR, AB))

    # CR
    CR = round(((OCR + DCR) / 2.0), 3)

    # Recommended DC
    RDC = calculateDC(CR)

    # Recommended PB
    PB = calculatePB(CR)

    # Calculate the monsters def CR if it were resistant to all damage
    CRres = not_neg(calculate_def_CR((HP * 2.0), AC))

    # Calculate the monsters def CR if it were vulnerable to all damage
    CRvul = not_neg(calculate_def_CR((HP * 0.5), AC))

    d = {
        "DCR" : DCR,
        "OCR" : OCR,
        "CR" : CR,
        "DC" : RDC,
        "PB" : PB,
        "DPR" : DPR,
        "CRres" : CRres,
        "CRvul" : CRvul
    }

    return d


@app.route("/traits", methods=["POST"])
def traits():

    database = r"traits.db"


    sqlconnect = sqlite3.connect(database)

    cursor = sqlconnect.cursor()

    query = "SELECT name FROM traits;"

    list = cursor.execute(query).fetchall()


    sqlconnect.close()

    d = {
        "traits": list
    }


    return  d



@app.route("/load_trait", methods=["POST"])
def load_trait():

    database = r"traits.db"

    sqlconnect = sqlite3.connect(database)

    cursor = sqlconnect.cursor()

    trait = request.form["trait"]



    example_query = "SELECT example FROM (SELECT * FROM traits WHERE name = ?);"

    example = cursor.execute(example_query, (trait, )).fetchall()




    description_query = "SELECT description FROM (SELECT * FROM traits WHERE name = ?);"

    description = cursor.execute(description_query, (trait, )).fetchall()




    effect_query = "SELECT effect FROM (SELECT * FROM traits WHERE name = ?);"

    effect = cursor.execute(effect_query, (trait, )).fetchall()



    sqlconnect.close()

    d = {
        "example": example,
        "description": description,
        "effect_on_CR": effect
    }

    return  d