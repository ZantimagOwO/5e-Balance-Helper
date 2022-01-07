function doo() {

    var atks = document.getElementsByName("atk").length;

    var DPR = 0

    var dnumlist = document.getElementsByName("dnum");

    var sizelist = document.getElementsByName("size");

    var DBlist = document.getElementsByName("DB");

    var natkslist = document.getElementsByName("natks");

    for (var i = 0; i < atks; i++)
    {
        var dnum = dnumlist[i].value;

        var size = sizelist[i].value;

        var DB = DBlist[i].value;

        var natks = natkslist[i].value;

        var raw = (size * dnum) / 1.0;

        var attack = ((raw + parseInt(DB)) * natks);

        DPR += attack;
    }

    var PCs = document.getElementsByName("PC").length

    for (var g = 0; g < PCs; g++)
    {

        $("#PC" + g + "result").remove()

        sim1v1(g);
    }

    var resistances = document.querySelectorAll("[name='res']")

    if (resistances[0].value)
    {
        var resistances2 = []

        for (var k = 0; k < resistances.length; k++)
        {
            var value = resistances[k].value

            resistances2.push(value)
        }

        $("#OR").show()

        $("#resistances").show()
    }

       

    

    
    var vulnerabilities = document.querySelectorAll("[name='vul']")

    if (vulnerabilities[0].value)
    {
        var vulnerabilities2 = []

        for (var k = 0; k < vulnerabilities.length; k++)
        {
            var value = vulnerabilities[k].value

            vulnerabilities2.push(value)
        }

        $("#OR").show()

        $("#vulnerabilities").show()
    }



    $.ajax({
        
        type : "POST",

        url : "/CR",

        processData : true,

        data : {
            "AC" : $("#AC").val(),
            "DPR" : DPR,
            "HP" : $("#HP").val(),
            "AB" : $("#AB").val(),
        }
        
    })

    .done(function(data) {

        $("#CR").text(data["CR"])        
        $("#OCR").text(data["OCR"]);
        $("#DCR").text(data["DCR"]);
        $("#RPB").text(data["PB"]);
        $("#RDC").text(data["DC"]);
        $("#ShowDPR").text(data["DPR"]);
        $("#CRres").text(data["CRres"]);
        $("#CRresistances").text(decent_text(resistances2));
        $("#CRvul").text(data["CRvul"]);
        $("#CRvulnerabilities").text(decent_text(vulnerabilities2))
    })

}


function add_atk(){
    
    var table = document.getElementById("atksbody")

    var count = table.rows.length;

    var row = table.insertRow(count);

    count += 1

    row.setAttribute("name", "atk")
    row.setAttribute("id", "atk" + count)

    // Number of dice as 1st input
    var cell1 = row.insertCell(0);
    var e1 = document.createElement("input");
    e1.min="0"
    e1.type="number"
    e1.name="dnum"
    e1.setAttribute("oninput", "doo()")
    e1.placeholder="N of Dice"
    e1.value="1"
    cell1.appendChild(e1)

    // 2nd element is just the letter d
    var cell2 = row.insertCell(1)
    var d = document.createTextNode("d")
    cell2.appendChild(d)

    // 3rd element is input for the size of the dice
    var cell3 = row.insertCell(2);
    var e2 = document.createElement("select");
    e2.name="size"
    e2.setAttribute("onchange", "doo()")
    e2.setAttribute("class", "form-select form-select-sm")

    // Adding all the options to the select

    var z = document.createElement("option");
    var t = document.createTextNode("-Size-");
    z.disabled=true;
    z.selected=true;
    z.value=0.0
    z.appendChild(t);
    e2.appendChild(z);

    var a = document.createElement("option");
    var b = document.createTextNode("4");
    a.appendChild(b);
    a.value=2.5
    e2.appendChild(a)

    var c = document.createElement("option");
    var d = document.createTextNode("6");
    c.appendChild(d);
    c.value=3.5
    e2.appendChild(c);

    var e = document.createElement("option");
    var f = document.createTextNode("8");
    e.appendChild(f);
    e.value=4.5
    e2.appendChild(e);

    var g = document.createElement("option");
    var h = document.createTextNode("10");
    g.appendChild(h);
    g.value=5.5
    e2.appendChild(g);

    var i = document.createElement("option");
    var j = document.createTextNode("12");
    i.appendChild(j);
    i.value=6.5
    e2.appendChild(i);

    var k = document.createElement("option");
    var l = document.createTextNode("20");
    k.appendChild(l);
    k.value=10.5
    e2.appendChild(k);

    cell3.appendChild(e2)

    // Write + as 4th element 
    var cell4 = row.insertCell(3)
    var plus = document.createTextNode("+")
    cell4.appendChild(plus)

    // Add the damage bonus input as the 5th element
    var cell5 = row.insertCell(4);
    var e4 = document.createElement("input");
    e4.min="0"
    e4.type="number"
    e4.name="DB"
    e4.setAttribute("oninput", "doo()")
    e4.placeholder="Damage Bonus"
    e4.value="0"
    cell5.appendChild(e4)

    //Write x as 6th element
    var cell6 = row.insertCell(5)
    var x = document.createTextNode("x")
    cell6.appendChild(x)

    // Add input number of times the attack is done as 7th element
    var cell7 = row.insertCell(6);
    var e5 = document.createElement("input");
    e5.min="0"
    e5.type="number"
    e5.name="natks"
    e5.setAttribute("oninput", "doo()")
    e5.placeholder="Times per turn"
    e5.value="1"
    cell7.appendChild(e5)

    // Add input for the damage type as 8th element

    var cell8 = row.insertCell(7);
    var e3 = document.createElement("select");
    e3.name="atktype"
    e3.setAttribute("onchange", "doo()")

    // Adding all the options to the select

    var a = document.createElement("option");
    var b = document.createTextNode("---Type---");
    a.disabled=true;
    a.selected=true;
    a.value=""
    a.appendChild(b);
    e3.appendChild(a);
    e3.setAttribute("class", "form-select form-select-sm")

    var c = document.createElement("option");
    var d = document.createTextNode("Bludgeoning");
    c.value="bludgeoning"
    c.appendChild(d);
    e3.appendChild(c);

    var e = document.createElement("option");
    var f = document.createTextNode("Slashing");
    e.value="slashing"
    e.appendChild(f);
    e3.appendChild(e);

    var g = document.createElement("option");
    var h = document.createTextNode("Piercing");
    g.value="piercing"
    g.appendChild(h);
    e3.appendChild(g);

    var i = document.createElement("option");
    var j = document.createTextNode("Fire");
    i.value="fire"
    i.appendChild(j);
    e3.appendChild(i);

    var k = document.createElement("option");
    var l = document.createTextNode("Cold");
    k.value="cold"
    k.appendChild(l);
    e3.appendChild(k);

    var m = document.createElement("option");
    var n = document.createTextNode("Lightning");
    m.value="lightning"
    m.appendChild(n);
    e3.appendChild(m);

    var o = document.createElement("option");
    var p = document.createTextNode("Thunder");
    o.value="thunder"
    o.appendChild(p);
    e3.appendChild(o);

    var q = document.createElement("option");
    var r = document.createTextNode("Force");
    q.value="force"
    q.appendChild(r);
    e3.appendChild(q);

    var s = document.createElement("option");
    var t = document.createTextNode("Radiant");
    s.value="radiant"
    s.appendChild(t);
    e3.appendChild(s);

    var u = document.createElement("option");
    var v = document.createTextNode("Necrotic");
    u.value="necrotic"
    u.appendChild(v);
    e3.appendChild(u);

    var w = document.createElement("option");
    var x = document.createTextNode("Poison");
    w.value="Poison"
    w.appendChild(x);
    e3.appendChild(w);

    var y = document.createElement("option");
    var z = document.createTextNode("Psychic");
    y.value="psychic"
    y.appendChild(z);
    e3.appendChild(y);

    var c3 = document.createElement("option");
    var d3 = document.createTextNode("Magical-Bludgeoning");
    c3.value="magical-bludgeoning"
    c3.appendChild(d3);
    e3.appendChild(c3);

    var ee = document.createElement("option");
    var f3 = document.createTextNode("Magical-Slashing");
    ee.value="magical-slashing"
    ee.appendChild(f3);
    e3.appendChild(ee);

    var g3 = document.createElement("option");
    var h3 = document.createTextNode("Magical-Piercing");
    g3.value="magical-piercing"
    g3.appendChild(h3);
    e3.appendChild(g3);
    cell8.appendChild(e3)

    $("#rmvatk").show()

  }

function rmv_atk(){

    var atks = document.getElementsByName("atk");

    var n = atks[atks.length - 1];

    n.remove();

    if (atks.length == 1) {

        $("#rmvatk").hide()
    }

    doo()

  }

  
function addPC(){

    var table = document.getElementById("PCsbody");


    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    var PCcount = document.getElementsByName("PC").length

    

    var PCid = "PC" + PCcount

    row.setAttribute("id", PCid)
    row.setAttribute("name", "PC")
    row.setAttribute("data-hasanattack", "false")
    row.setAttribute("data-hasaresistance", "true")

    var cell0 = row.insertCell(0)
    element0 = document.createElement("input") 
    element0.type="text"
    element0.placeholder="Name"
    element0.name="PCname"
    element0.id="PC" + PCcount + "name"
    element0.setAttribute("oninput", "sim1v1(" + PCcount + ")")
    element0.autocomplete="off"
    cell0.appendChild(element0)


    var cell1 = row.insertCell(1);

    var element1 = document.createElement("input");
    element1.type = "number";
    element1.name="PCHP";
    element1.id=PCid+ "HP"
    element1.placeholder="HP"
    element1.min="1"
    element1.setAttribute("oninput", "sim1v1(" + PCcount + ")")
    cell1.appendChild(element1);
    cell1.name="HPcell"

    var cell2 = row.insertCell(2);
    var element2 = document.createElement("input");
    element2.type = "number";
    element2.name="PCAC";
    element2.id=PCid + "AC"
    element2.placeholder="AC"
    element2.value=12
    element2.min="1"
    element2.setAttribute("oninput", "sim1v1(" + PCcount + ")")
    cell2.appendChild(element2);
    cell2.name="ACcell"

    // Allow to add resistances in the 3th cell
    // 3rd element is input for the PCs resistances
    var cell3 = row.insertCell(3);
    var e3 = document.createElement("select");
    e3.name="" + PCid + "res"
    e3.setAttribute("onchange", "sim1v1(" + PCcount + ")")
    e3.setAttribute("class", "form-select form-select-sm")

    // Adding all the options to the select

    var a = document.createElement("option");
    var b = document.createTextNode("--Resistance--");
    a.disabled=true;
    a.selected=true;
    a.value=""
    a.appendChild(b);
    e3.appendChild(a);

    var c = document.createElement("option");
    var d = document.createTextNode("Bludgeoning");
    c.value="bludgeoning"
    c.appendChild(d);
    e3.appendChild(c);

    var e = document.createElement("option");
    var f = document.createTextNode("Slashing");
    e.value="slashing"
    e.appendChild(f);
    e3.appendChild(e);

    var g = document.createElement("option");
    var h = document.createTextNode("Piercing");
    g.value="piercing"
    g.appendChild(h);
    e3.appendChild(g);

    var i = document.createElement("option");
    var j = document.createTextNode("Fire");
    i.value="fire"
    i.appendChild(j);
    e3.appendChild(i);

    var k = document.createElement("option");
    var l = document.createTextNode("Cold");
    k.value="cold"
    k.appendChild(l);
    e3.appendChild(k);

    var m = document.createElement("option");
    var n = document.createTextNode("Lightning");
    m.value="lightning"
    m.appendChild(n);
    e3.appendChild(m);

    var o = document.createElement("option");
    var p = document.createTextNode("Thunder");
    o.value="thunder"
    o.appendChild(p);
    e3.appendChild(o);

    var q = document.createElement("option");
    var r = document.createTextNode("Force");
    q.value="force"
    q.appendChild(r);
    e3.appendChild(q);

    var s = document.createElement("option");
    var t = document.createTextNode("Radiant");
    s.value="radiant"
    s.appendChild(t);
    e3.appendChild(s);

    var u = document.createElement("option");
    var v = document.createTextNode("Necrotic");
    u.value="necrotic"
    u.appendChild(v);
    e3.appendChild(u);

    var w = document.createElement("option");
    var x = document.createTextNode("Poison");
    w.value="Poison"
    w.appendChild(x);
    e3.appendChild(w);

    var y = document.createElement("option");
    var z = document.createTextNode("Psychic");
    y.value="psychic"
    y.appendChild(z);
    e3.appendChild(y);

    var c3 = document.createElement("option");
    var d3 = document.createTextNode("Magical-Bludgeoning");
    c3.value="magical-bludgeoning"
    c3.appendChild(d3);
    e3.appendChild(c3);

    var ee = document.createElement("option");
    var f3 = document.createTextNode("Magical-Slashing");
    ee.value="magical-slashing"
    ee.appendChild(f3);
    e3.appendChild(ee);

    var g3 = document.createElement("option");
    var h3 = document.createTextNode("Magical-Piercing");
    g3.value="magical-piercing"
    g3.appendChild(h3);
    e3.appendChild(g3);



    cell3.appendChild(e3)




    var cell4 = row.insertCell(4)
    var e4 = document.createElement("select")
    e4.id="" + PCid + "class"
    e4.name="class"
    e4.setAttribute("onchange", "martial(" + PCcount + ")")
    e4.setAttribute("class", "form-select form-select-sm")

    var n = document.createElement("option")
    var ll = document.createTextNode("--Class--")
    n.value=""
    n.selected=true
    n.disabled=true
    n.appendChild(ll)
    e4.appendChild(n)

    var caster = document.createElement("option")
    var caster_txt = document.createTextNode("Caster")
    caster.value="caster"
    caster.appendChild(caster_txt)
    e4.appendChild(caster)

    var martial = document.createElement("option")
    var martial_txt = document.createTextNode("Martial")
    martial.value="martial"
    martial.appendChild(martial_txt)
    e4.appendChild(martial)

    cell4.appendChild(e4)

    // Add new row with buttons to add inputs

    var row2 = table.insertRow()
    row2.id="" + PCid + "-0"
    row2.setAttribute("name", "" + PCid + "row")
    row2.setAttribute("data-hasaresistance", "false")

    row2.insertCell(0)

    row2.insertCell(1)

    row2.insertCell(2)

    var cell_res = row2.insertCell(3)
    cell_res.setAttribute("id", "addrmvresbuttonscell")
    cell_res.style.textAlign = "left"
    var buttons = document.createElement("div")
    buttons.style.textAlign = "left"

    var addpcresbutton = document.createElement("button")
    addpcresbutton.setAttribute("onclick", "add_resPC(" + PCcount + ")")
    addpcresbutton.innerText="+"
    addpcresbutton.id="" + PCid + "addres"
    addpcresbutton.setAttribute("class", "btn btn-success")

    var rmvpcresbutton = document.createElement("button")
    rmvpcresbutton.setAttribute("onclick", "rmv_resPC(" + PCcount + ")")
    rmvpcresbutton.innerText="-"
    rmvpcresbutton.id="" + PCid + "rmvres"
    rmvpcresbutton.setAttribute("class", "btn btn-danger")

    buttons.appendChild(addpcresbutton)
    buttons.appendChild(rmvpcresbutton)

    cell_res.appendChild(buttons)

    for (var b = 0; b < 8; b++)
    {
        row2.insertCell(4)
    }


    var rmvrestemp = document.getElementById(PCid + "rmvres")

    rmvrestemp.style.visibility = "hidden"

    

    
    $("#rmvPC").show();

}


function rmvPC(){

    var PCs = document.getElementsByName("PC").length

    var PCid = "PC" + (PCs - 1)



    var PCrows = document.querySelectorAll("tr[name='" + PCid + "row']")

    for (var i = 0; i < PCrows.length; i++)
    {
        PCrows[i].remove()
    }

    if (PCs == 2)
    {
        $("#rmvPC").hide();
    }

    $("#" + PCid).remove()

    var PCalerts = document.querySelectorAll("h2[name='" + PCid + "alert']")

    for (var a = 0; a < PCalerts.length; a++)
    {
        PCalerts[a].remove()
    }

    var PCinfo = document.querySelectorAll("h2[name='" + PCid + "info']")

    for (var a = 0; a < PCinfo.length; a++)
    {
        PCinfo[a].remove()
    }

    var PCsim1v1 = document.querySelectorAll("h2[name='" + PCid + "sim1v1']")

    for (var a = 0; a < PCinfo.length; a++)
    {
        PCsim1v1[a].remove()
    }

}

function sim1v1(PCid){

    // Declare varaibles and check if the needed inputs exist
    atks = document.getElementsByName("atk").length;

    var DPR = 0;

    var PCresistances = document.querySelectorAll("[name='PC" + PCid + "res']")

    var PCHP = document.getElementById("PC" + PCid + "HP").value
    
    if (PCHP == "" || PCHP == null || PCHP < 1)
    {
        return 1
    }

    var HP = document.getElementById("HP").value

    if (HP == "" || HP == null || HP < 1)
        {
            return 2
        }

    var PCAC = document.getElementById("PC" + PCid + "AC").value

    var AB = $("#AB").val()

    var name = document.getElementById("PC" + PCid + "name").value

    if (name == "" || name == null || name == undefined || name == "undefined")
    {
        name = "PC" + (PCid + 1)
    }

    

    // Calculate the monster's DPR and alerts

    var maxDPRdmg = 0

    let PCdeathHP = (PCHP * 2.0)

    var multiattack = 0

    var atkslength = document.getElementsByName("atk").length

    var dnumlist = document.getElementsByName("dnum")

    var sizelist = document.getElementsByName("size")

    var DBlist = document.getElementsByName("DB")

    var natkslist = document.getElementsByName("natks")

    var typelist = document.getElementsByName("atktype")

    for (var i = 0; i < atkslength; i++)
    {
        var dnum = dnumlist[i].value

        var size = sizelist[i].value

        var DB = parseInt(DBlist[i].value)

        var natks = natkslist[i].value

        if (dnum == 0 || size == 0 || natks == 0)
        {
            continue
        }

        var raw = (size * dnum) * 1.0

        var attack = ((raw + parseInt(DB)) * natks);

        var type = typelist[i].value


        var max_damage_perdie = (size * 2.0) - 1

        var max_damage = (max_damage_perdie * dnum) + DB

        var crit_dnum = dnum * 2
         
        var max_damage_crit = (max_damage_perdie * crit_dnum) + DB

        var average_damage_crit = (size * crit_dnum) + DB


        if (type != "")
        {
            for (var y = 0; y < PCresistances.length; y++)
            {
                if (PCresistances[y].value == type)
                {
                    attack = attack / 2.0

                    max_damage = Math.round(max_damage / 2.0)
         
                    max_damage_crit = Math.round(max_damage_crit / 2.0)

                    average_damage_crit = Math.round(average_damage_crit / 2.0)

                    break
                }
            }
        }

        multiattack += natks * 1.0

        // Calculate alerts (chance of the attack dropping unconscious or killing the PC)

        DB = parseInt(DB)

        
        

        $("#PC" + PCid + "alert_unconscious" + i).remove()

        $("#PC" + PCid + "alert_dead" + i).remove()

        $("#PC" + PCid + "alert_unconscious_crit" + i).remove()

        $("#PC" + PCid + "alert_dead_crit" + i).remove()

        // Alert of the chance of normal attack downing

        var hit_kill = false

        if (max_damage >= PCdeathHP)
        {

            var alert3 = document.createElement("h2")

            alert3.setAttribute("class", "container rounded")


            if ((max_damage * 0.5) + DB >= PCdeathHP)
            {
                var alert3_text ="Attack " + (i + 1) + " will very likely kill " + name + " on hit."

            }
            else if ((max_damage * 0.65) + DB >= PCdeathHP)
            {
                var alert3_text ="Attack " + (i + 1) + " will likely kill " + name + " on hit."

            }
            else
            {
                var alert3_text ="Attack " + (i + 1) + " could, potentially, kill " + name + " on hit."

            }

            hit_kill = true


            alert3.textContent = alert3_text
            alert3.id= "PC" + PCid + "alert_dead" + i
            alert3.setAttribute("name", "PC" + PCid + "alert")

            document.getElementById("hit_kill").appendChild(alert3)
        }
        else if (max_damage >= PCHP)
        {

            

            var alert1 = document.createElement("h2")

            alert1.setAttribute("class", "container rounded")


            if ((max_damage * 0.5) + DB >= PCHP)
            {
                var alert1_text ="Attack " + (i + 1) + " will very likely drop " + name + " unconscious on hit."

            }
            else if ((max_damage * 0.65) + DB >= PCHP)
            {
                var alert1_text ="Attack " + (i + 1) + " will likely drop " + name + " unconscious on hit."

            }
            else
            {
                var alert1_text ="Attack " + (i + 1) + " could, potentially, drop " + name + " unconscious on hit."

            }




            alert1.textContent = alert1_text
            alert1.id= "PC" + PCid + "alert_unconscious" + i
            alert1.setAttribute("name", "PC" + PCid + "alert")

            document.getElementById("hit_unconscious").appendChild(alert1)
        }



        // Alert of the chance of crit downing

        

        if (!(hit_kill))
        {
            if (max_damage_crit >= PCdeathHP)
            {
                

                var alert4 = document.createElement("h2")

                alert4.setAttribute("class", "container rounded")

                if (average_damage_crit >= PCdeathHP)
                {
                    var alert4_text ="Attack " + (i + 1) + " will very likely kill " + name + " on crit."

                }
                else if ((max_damage_crit * 0.65) >= PCdeathHP)
                {
                    var alert4_text ="Attack " + (i + 1) + " will likely kill " + name + " on crit."

                }
                else
                {
                    var alert4_text ="Attack " + (i + 1) + " could, potentially, kill " + name + " on crit."

                }




                alert4.textContent = alert4_text
                alert4.id= "PC" + PCid + "alert_dead_crit" + i
                alert4.setAttribute("name", "PC" + PCid + "alert")

                document.getElementById("crit_kill").appendChild(alert4)

            }
            else if (max_damage_crit >= PCHP)
            {
                

                var alert2 = document.createElement("h2")

                alert2.setAttribute("class", "container rounded")



                if (average_damage_crit >= PCHP)
                {
                    var alert2_text ="Attack " + (i + 1) + " will very likely drop " + name + " unconscious on crit."

                }
                else if ((max_damage_crit * 0.65) >= PCHP)
                {
                    var alert2_text ="Attack " + (i + 1) + " will likely drop " + name + " unconscious on crit."

                }
                else
                {
                    var alert2_text ="Attack " + (i + 1) + " could, potentially, drop " + name + " unconscious on crit."
                }


                alert2.textContent = alert2_text
                alert2.id= "PC" + PCid + "alert_unconscious_crit" + i
                alert2.setAttribute("name", "PC" + PCid + "alert")

                document.getElementById("crit_unconscious").appendChild(alert2)
            }
        }

        // Add the attack's damage to the monster's total DPR

        maxDPRdmg += max_damage * natks

        DPR += attack;
    }

    if (DPR == 0)
    {
        return 1
    }

    $("#PC" + PCid + "alert_dead_DPR").remove()

    $("#PC" + PCid + "alert_unconscious_DPR").remove()

    if (multiattack > 1)
    {
        if (maxDPRdmg >= PCdeathHP)
        {

            var alert3 = document.createElement("h2")

            alert3.setAttribute("class", "container rounded")


            if ((maxDPRdmg * 0.5) >= PCdeathHP)
            {
                var alert3_text ="Should the monster land every attack in one round against " + name + ", they would very likely die."

            }
            else if ((maxDPRdmg * 0.65) >= PCdeathHP)
            {
                var alert3_text ="Should the monster land every attack in one round against " + name + ", they would likely die."
            }
            else
            {
                var alert3_text ="Should the monster land every attack in one round against " + name + ", they could potentially die."

            }



            alert3.textContent = alert3_text
            alert3.id= "PC" + PCid + "alert_dead_DPR"
            alert3.setAttribute("name", "PC" + PCid + "alert")

            document.getElementById("DPR_unconscious").appendChild(alert3)
        }
        else if (maxDPRdmg >= PCHP)
        {
    
            var alert3 = document.createElement("h2")
    
            alert3.setAttribute("class", "container rounded")
    
            if ((maxDPRdmg * 0.5) >= PCHP)
            {
                var alert3_text ="Should the monster land every attack in one round against " + name + ", they would very likely go unconscious."
    
            }
            else if ((maxDPRdmg * 0.65) >= PCHP)
            {
                var alert3_text ="Should the monster land every attack in one round against " + name + ", they would likely go unconscious."
    
            }
            else
            {
                var alert3_text ="Should the monster land every attack in one round against " + name + ", they could potentially go unconscious."
    
            }
    
    
    
            alert3.textContent = alert3_text
            alert3.id= "PC" + PCid + "alert_unconscious_DPR"
            alert3.setAttribute("name", "PC" + PCid + "alert")
    
            document.getElementById("DPR_unconscious").appendChild(alert3)
        }
    
        


    }

    $("#monsterchancePC" + PCid).remove()

    var chance = Math.min((Math.max((1 - ((PCAC - AB - 1) / 20.0)), 0.05)), 0.95)

    var chanceelement = document.createElement("h2")
    chanceelement.textContent = "The monster has a " + Math.round(chance * 100) + "% chance to hit " + name + "."
    chanceelement.setAttribute("class", "container rounded")
    chanceelement.id= "monsterchancePC" + PCid
    chanceelement.setAttribute("name", "PC" + PCid + "info")

    document.getElementById("monsterinfo").appendChild(chanceelement)

    $("#monsterinfo").appendChild

    var rounds = Math.max(Math.round(PCHP / (DPR * chance)), 1)

    $("#PC" + PCid + "result").remove()


    if (document.getElementById("PC" + PCid + "class").value == "martial")
    {
        var AC = document.getElementById("AC").value

        var PCAB = document.getElementById("PC" + PCid + "AB").value



        var resistances = document.querySelectorAll("[name='res']")

        var vulnerabilities = document.querySelectorAll("[name='vul']")


        var PCDPR = 0

        var PCdnumlist = document.getElementsByName("PC" + PCid + "dnum")

        var PCsizelist = document.getElementsByName("PC" + PCid + "size")

        var PCDBlist = document.getElementsByName("PC" + PCid + "DB")

        var PCnatkslist = document.getElementsByName("PC" + PCid + "natks")

        var PCtypelist = document.getElementsByName("PC" + PCid + "atktype")


        for (var i = 0; i < PCdnumlist.length; i++)
        {

            var dnum = PCdnumlist[i].value

            var size = PCsizelist[i].value

            var DB = parseInt(PCDBlist[i].value)

            var times =PCnatkslist[i].value

            let PCraw = (size * dnum) * 1.0

            let damage = ((PCraw + parseInt(DB)) * times)

            var type = PCtypelist[i].value


            if (type != "")
            {

                for (var g = 0; g < resistances.length; g++)
                {
                    var re = resistances[g].value

                    if (re == type)
                    {
                        damage = damage / 2.0

                        break
                    }
                }

                for (var j = 0; j < vulnerabilities.length; j++)
                {
                    var vuln = vulnerabilities[j].value

                    if (vuln == type)
                    {
                        damage = damage * 2.0

                        break
                    }
                }

                
            }
            

            PCDPR += damage
        }

        var PCchance = Math.min((Math.max((1 - ((AC - PCAB - 1) / 20.0)), 0.05)), 0.95)

        $("#PC" + PCid + "chance").remove()

        var PCchanceelement = document.createElement("h2")

        PCchanceelement.setAttribute("class", "container rounded")

        PCchanceelement.textContent = name + " has a " + Math.round(PCchance * 100) + "% chance to hit the monster and an average DPR of " + PCDPR + "."
        PCchanceelement.setAttribute("class", "container rounded")
        PCchanceelement.id= "PC" + PCid + "chance"
        PCchanceelement.setAttribute("name", "PC" + PCid + "info")

        document.getElementById("PCsinfo").appendChild(PCchanceelement)

        var PCrounds = Math.max(Math.round(HP / (PCDPR * PCchance)), 1)


        if (PCrounds < rounds)
        {
            var remaininghp = Math.round(PCHP - ((DPR * chance) * PCrounds))

            let text ="On average, " + name + " would, on his own, kill the monster after " + PCrounds + " rounds, with " + remaininghp + " HP remaining." 

            var a = document.createElement("h2")
            a.setAttribute("class", "container rounded")
            a.textContent = text
            a.id= "PC" + PCid + "result"
            a.setAttribute("name", "PC" + PCid + "sim1v1")

            document.getElementById("simulated1v1s").appendChild(a)
        }
        else if (PCrounds == rounds)
        {


            rounds = Math.round(rounds)

            let text ="" + name + " would, on his own, have a ~50% chance of killing the monster."

            var a = document.createElement("h2")
            a.setAttribute("class", "container rounded")
            a.textContent = text
            a.id= "PC" + PCid + "result"
            a.setAttribute("name", "PC" + PCid + "sim1v1")

            document.getElementById("simulated1v1s").appendChild(a)
        }
        else
        {
            var PCdmgbeforedying = Math.round(rounds * (PCchance * PCDPR))

            rounds = Math.round(rounds)

            let text ="On average, " + name + " would, on his own, survive " + rounds + " rounds against the monster, dealing " + PCdmgbeforedying + " points of damage before dying."

            var a = document.createElement("h2")
            a.setAttribute("class", "container rounded")
            a.textContent = text
            a.id= "PC" + PCid + "result"
            a.setAttribute("name", "PC" + PCid + "sim1v1")

            document.getElementById("simulated1v1s").appendChild(a)
        }
    }
    else
    {
        rounds = Math.round(rounds)

        let text ="On average, " + name + " would, on his own, survive " + rounds + " rounds against the monster."

        var a = document.createElement("h2")
        a.setAttribute("class", "container rounded")
        a.textContent = text
        a.id= "PC" + PCid + "result"
        a.setAttribute("name", "PC" + PCid + "sim1v1")
    
        document.getElementById("simulated1v1s").appendChild(a)
    }



    
}

function add_resPC(PCnum)
{

    var buttonsrow = document.querySelector("#PC" + PCnum + "-0")

    var add = buttonsrow.rowIndex - 1

    var rows = document.getElementById("PCsbody").getElementsByTagName("tr")
    
    var PCid = document.getElementById("PC" + PCnum).id

    for (var i = 0; i < rows.length; i++)
    {
        var row = rows[i]

        if (row.name == "PC" + PCnum + "row" && row.cells[3].childElementCount < 1)
        {
            var found = true

            row = rows[i]

            row.deleteCell(3)

            break;
        }
    }
    
    if (!found)
    {
        var table = document.getElementById("PCsbody")

        var row = table.insertRow(add)

        row.insertCell(0)

        row.insertCell(1)

        row.insertCell(2)

        row.setAttribute("data-hasanattack", "false")
    }

    

    

    var PCrows = document.getElementsByName("" + PCid + "row")

    var possition = PCrows.length


    row.id= "" + PCid + "-" + possition


    row.setAttribute("name", "" + PCid + "row")

    row.setAttribute("data-hasaresistance", "true")



    // 3rd element is input for the PCs resistances
    var cell = row.insertCell(3);
    var e3 = document.createElement("select");
    e3.name="" + PCid + "res"
    e3.setAttribute("onchange", "sim1v1(" + PCnum + ")")
    e3.setAttribute("class", "form-select form-select-sm")

    // Adding all the options to the select

    var a = document.createElement("option");
    var b = document.createTextNode("--Resistance--");
    a.disabled=true;
    a.selected=true;
    a.value=""
    a.appendChild(b);
    e3.appendChild(a);

    var c = document.createElement("option");
    var d = document.createTextNode("Bludgeoning");
    c.value="bludgeoning"
    c.appendChild(d);
    e3.appendChild(c);

    var e = document.createElement("option");
    var f = document.createTextNode("Slashing");
    e.value="slashing"
    e.appendChild(f);
    e3.appendChild(e);

    var g = document.createElement("option");
    var h = document.createTextNode("Piercing");
    g.value="piercing"
    g.appendChild(h);
    e3.appendChild(g);

    var i = document.createElement("option");
    var j = document.createTextNode("Fire");
    i.value="fire"
    i.appendChild(j);
    e3.appendChild(i);

    var k = document.createElement("option");
    var l = document.createTextNode("Cold");
    k.value="cold"
    k.appendChild(l);
    e3.appendChild(k);

    var m = document.createElement("option");
    var n = document.createTextNode("Lightning");
    m.value="lightning"
    m.appendChild(n);
    e3.appendChild(m);

    var o = document.createElement("option");
    var p = document.createTextNode("Thunder");
    o.value="thunder"
    o.appendChild(p);
    e3.appendChild(o);

    var q = document.createElement("option");
    var r = document.createTextNode("Force");
    q.value="force"
    q.appendChild(r);
    e3.appendChild(q);

    var s = document.createElement("option");
    var t = document.createTextNode("Radiant");
    s.value="radiant"
    s.appendChild(t);
    e3.appendChild(s);

    var u = document.createElement("option");
    var v = document.createTextNode("Necrotic");
    u.value="necrotic"
    u.appendChild(v);
    e3.appendChild(u);

    var w = document.createElement("option");
    var x = document.createTextNode("Poison");
    w.value="Poison"
    w.appendChild(x);
    e3.appendChild(w);

    var y = document.createElement("option");
    var z = document.createTextNode("Psychic");
    y.value="psychic"
    y.appendChild(z);
    e3.appendChild(y);

    var c3 = document.createElement("option");
    var d3 = document.createTextNode("Magical-Bludgeoning");
    c3.value="magical-bludgeoning"
    c3.appendChild(d3);
    e3.appendChild(c3);

    var ee = document.createElement("option");
    var f3 = document.createTextNode("Magical-Slashing");
    ee.value="magical-slashing"
    ee.appendChild(f3);
    e3.appendChild(ee);

    var g3 = document.createElement("option");
    var h3 = document.createTextNode("Magical-Piercing");
    g3.value="magical-piercing"
    g3.appendChild(h3);
    e3.appendChild(g3);



    cell.appendChild(e3)


    

    var rmvrestemp = document.getElementById(PCid + "rmvres")

    rmvrestemp.style.visibility = "visible"

}

function rmv_resPC(PCnum)
{

    var resistances = document.querySelectorAll("[name='PC" + PCnum + "res']")

    var element = resistances[resistances.length - 1]

    var row = element.parentElement.parentElement

    if (row.querySelectorAll("[name='PC" + PCnum + "dnum']")[0] || row.querySelector("#PC" + PCnum + "addatk"))
    {
        element.remove()
    }
    else
    {
        row.remove()
    }

    

    if (resistances.length == 2)
    {
        var x = document.querySelector("#PC" + PCnum + "rmvres")
        
        x.style.visibility = "hidden"
    }

    sim1v1(PCnum)
}

function add_res()
{
    var table = document.getElementById("Defbody")

    var rows = table.getElementsByTagName("tr")

    var row = table.insertRow(rows.length - 1)

    



    row.insertCell(0)

    row.insertCell(1)
    
    var cell = row.insertCell(2)

    row.insertCell(3)

    


    

    var e3 = document.createElement("select");
    e3.name="res"
    e3.setAttribute("class", "form-select form-select-sm")
    e3.setAttribute("onchange", "doo()")


    // Adding all the options to the select

    var a = document.createElement("option");
    var b = document.createTextNode("---Resistance---");
    a.disabled=true;
    a.selected=true;
    a.value=""
    a.appendChild(b);
    e3.appendChild(a);
    

    var c = document.createElement("option");
    var d = document.createTextNode("Bludgeoning");
    c.value="bludgeoning"
    c.appendChild(d);
    e3.appendChild(c);

    var e = document.createElement("option");
    var f = document.createTextNode("Slashing");
    e.value="slashing"
    e.appendChild(f);
    e3.appendChild(e);

    var g = document.createElement("option");
    var h = document.createTextNode("Piercing");
    g.value="piercing"
    g.appendChild(h);
    e3.appendChild(g);

    var i = document.createElement("option");
    var j = document.createTextNode("Fire");
    i.value="fire"
    i.appendChild(j);
    e3.appendChild(i);

    var k = document.createElement("option");
    var l = document.createTextNode("Cold");
    k.value="cold"
    k.appendChild(l);
    e3.appendChild(k);

    var m = document.createElement("option");
    var n = document.createTextNode("Lightning");
    m.value="lightning"
    m.appendChild(n);
    e3.appendChild(m);

    var o = document.createElement("option");
    var p = document.createTextNode("Thunder");
    o.value="thunder"
    o.appendChild(p);
    e3.appendChild(o);

    var q = document.createElement("option");
    var r = document.createTextNode("Force");
    q.value="force"
    q.appendChild(r);
    e3.appendChild(q);

    var s = document.createElement("option");
    var t = document.createTextNode("Radiant");
    s.value="radiant"
    s.appendChild(t);
    e3.appendChild(s);

    var u = document.createElement("option");
    var v = document.createTextNode("Necrotic");
    u.value="necrotic"
    u.appendChild(v);
    e3.appendChild(u);

    var w = document.createElement("option");
    var x = document.createTextNode("Poison");
    w.value="Poison"
    w.appendChild(x);
    e3.appendChild(w);

    var y = document.createElement("option");
    var z = document.createTextNode("Psychic");
    y.value="psychic"
    y.appendChild(z);
    e3.appendChild(y);

    var c3 = document.createElement("option");
    var d3 = document.createTextNode("Magical-Bludgeoning");
    c3.value="magical-bludgeoning"
    c3.appendChild(d3);
    e3.appendChild(c3);

    var ee = document.createElement("option");
    var f3 = document.createTextNode("Magical-Slashing");
    ee.value="magical-slashing"
    ee.appendChild(f3);
    e3.appendChild(ee);

    var g3 = document.createElement("option");
    var h3 = document.createTextNode("Magical-Piercing");
    g3.value="magical-piercing"
    g3.appendChild(h3);
    e3.appendChild(g3);




    if (rows.length > 2)
    {
        for (var i = 1; i < (rows.length - 2); i++)
        {
            var temprow = rows[i]

            var resi = Boolean(temprow.querySelector("select[name='res']"))

            var vuln = Boolean(temprow.querySelector("select[name='vul']"))

            if (!(resi) && (vuln))
            {

                var tempcell = temprow.insertCell(2)

                tempcell.appendChild(e3)

                table.deleteRow(rows.length - 2)

                temprow.deleteCell(3)

                $("#rmvres").show()

                return
            }
        }
    }

    $("#rmvres").show()

    cell.appendChild(e3)
    
}

function rmv_res()
{
    var resistances = document.querySelectorAll("[name='res']")

    var element = resistances[resistances.length - 1]

    var row = element.parentElement.parentElement

    if (row.querySelectorAll("[name='vul']")[0])
    {
        element.remove()
    }
    else
    {
        row.remove()
    }

    

    if (resistances.length == 2)
    {
        $("#rmvres").hide()
    }

    doo()
}

function add_vul(){

    $("#rmvvul").show()

    var table = document.getElementById("Defbody")

    var rows = table.getElementsByTagName("tr")

    

    var row = table.insertRow(rows.length - 1)



    row.insertCell(0)

    row.insertCell(1)

    row.insertCell(2)
    
    var cell = row.insertCell(3)



    var e3 = document.createElement("select");
    e3.name="vul"
    e3.setAttribute("class", "form-select form-select-sm")
    e3.setAttribute("onchange", "doo()")

    // Adding all the options to the select

    var a = document.createElement("option");
    var b = document.createTextNode("---Vulnerability---");
    a.disabled=true;
    a.selected=true;
    a.value=""
    a.appendChild(b);
    e3.appendChild(a);

    var c = document.createElement("option");
    var d = document.createTextNode("Bludgeoning");
    c.value="bludgeoning"
    c.appendChild(d);
    e3.appendChild(c);

    var e = document.createElement("option");
    var f = document.createTextNode("Slashing");
    e.value="slashing"
    e.appendChild(f);
    e3.appendChild(e);

    var g = document.createElement("option");
    var h = document.createTextNode("Piercing");
    g.value="piercing"
    g.appendChild(h);
    e3.appendChild(g);

    var i = document.createElement("option");
    var j = document.createTextNode("Fire");
    i.value="fire"
    i.appendChild(j);
    e3.appendChild(i);

    var k = document.createElement("option");
    var l = document.createTextNode("Cold");
    k.value="cold"
    k.appendChild(l);
    e3.appendChild(k);

    var m = document.createElement("option");
    var n = document.createTextNode("Lightning");
    m.value="lightning"
    m.appendChild(n);
    e3.appendChild(m);

    var o = document.createElement("option");
    var p = document.createTextNode("Thunder");
    o.value="thunder"
    o.appendChild(p);
    e3.appendChild(o);

    var q = document.createElement("option");
    var r = document.createTextNode("Force");
    q.value="force"
    q.appendChild(r);
    e3.appendChild(q);

    var s = document.createElement("option");
    var t = document.createTextNode("Radiant");
    s.value="radiant"
    s.appendChild(t);
    e3.appendChild(s);

    var u = document.createElement("option");
    var v = document.createTextNode("Necrotic");
    u.value="necrotic"
    u.appendChild(v);
    e3.appendChild(u);

    var w = document.createElement("option");
    var x = document.createTextNode("Poison");
    w.value="Poison"
    w.appendChild(x);
    e3.appendChild(w);

    var y = document.createElement("option");
    var z = document.createTextNode("Psychic");
    y.value="psychic"
    y.appendChild(z);
    e3.appendChild(y);

    var c3 = document.createElement("option");
    var d3 = document.createTextNode("Magical-Bludgeoning");
    c3.value="magical-bludgeoning"
    c3.appendChild(d3);
    e3.appendChild(c3);

    var ee = document.createElement("option");
    var f3 = document.createTextNode("Magical-Slashing");
    ee.value="magical-slashing"
    ee.appendChild(f3);
    e3.appendChild(ee);

    var g3 = document.createElement("option");
    var h3 = document.createTextNode("Magical-Piercing");
    g3.value="magical-piercing"
    g3.appendChild(h3);
    e3.appendChild(g3);
    
    
    
    


    if (rows.length > 2)
    {
        for (var i = 1; i < (rows.length - 2); i++)
        {
            var temprow = rows[i]

            var resi = Boolean(temprow.querySelector("select[name='res']"))

            var vuln = Boolean(temprow.querySelector("select[name='vul']"))

            if (resi && !(vuln))
            {

                var tempcell = temprow.insertCell(3)

                tempcell.appendChild(e3)

                table.deleteRow(rows.length - 2)

                return
            }
        }
    }

    cell.appendChild(e3)

}

function rmv_vul(){

    var vulnerabilities = document.querySelectorAll("[name='vul']")

    var element = vulnerabilities[vulnerabilities.length - 1]

    var row = element.closest("tr")

    if (row.querySelectorAll("[name='res']")[0])
    {
        element.remove()
    }
    else
    {
        row.remove()
    }

    

    if (vulnerabilities.length == 2)
    {
        $("#rmvvul").hide()
    }

    doo()
}

function martial(PCid){

    if ($("#PC" + PCid + "class").val() == "martial")
    {
        $("#attack_bonus_PCsshow").show()

        var row = document.querySelector("#PC" + PCid)

        // Number of dice as 1st input
        var cell1 = row.insertCell(5);
        var e1 = document.createElement("input");
        e1.min="0"
        e1.type="number"
        e1.name="PC" + PCid + "dnum"
        e1.setAttribute("oninput", "sim1v1(" + PCid + ")")
        e1.placeholder="N of Dice"
        e1.value="1"
        cell1.appendChild(e1)

        // 2nd element is just the letter d
        var cell2 = row.insertCell(6)
        var d = document.createTextNode("d")
        cell2.appendChild(d)

        // 3rd element is input for the size of the dice
        var cell3 = row.insertCell(7);
        var e2 = document.createElement("select");
        e2.name="PC" + PCid + "size"
        e2.setAttribute("onchange", "sim1v1(" + PCid + ")")
        e2.setAttribute("class", "form-select form-select-sm")

        // Adding all the options to the select

        var z = document.createElement("option");
        var t = document.createTextNode("--Size--");
        z.disabled=true;
        z.selected=true;
        z.value=0
        z.appendChild(t);
        e2.appendChild(z);

        var a = document.createElement("option");
        var b = document.createTextNode("4");
        a.appendChild(b);
        a.value=2.5
        e2.appendChild(a)

        var c = document.createElement("option");
        var d = document.createTextNode("6");
        c.appendChild(d);
        c.value=3.5
        e2.appendChild(c);

        var e = document.createElement("option");
        var f = document.createTextNode("8");
        e.appendChild(f);
        e.value=4.5
        e2.appendChild(e);

        var g = document.createElement("option");
        var h = document.createTextNode("10");
        g.appendChild(h);
        g.value=5.5
        e2.appendChild(g);

        var i = document.createElement("option");
        var j = document.createTextNode("12");
        i.appendChild(j);
        i.value=6.5
        e2.appendChild(i);

        var k = document.createElement("option");
        var l = document.createTextNode("20");
        k.appendChild(l);
        k.value=10.5
        e2.appendChild(k);

        cell3.appendChild(e2)

        // Write + as 4th element 
        var cell4 = row.insertCell(8)
        var plus = document.createTextNode("+")
        cell4.appendChild(plus)

        // Add the damage bonus input as the 5th element
        var cell5 = row.insertCell(9);
        var e4 = document.createElement("input");
        e4.min="0"
        e4.type="number"
        e4.name="PC" + PCid + "DB"
        e4.setAttribute("oninput", "sim1v1(" + PCid + ")")
        e4.placeholder="Damage Bonus"
        e4.value="0"
        cell5.appendChild(e4)

        //Write x as 6th element
        var cell6 = row.insertCell(10)
        var x = document.createTextNode("x")
        cell6.appendChild(x)

        // Add input number of times the attack is done as 7th element
        var cell7 = row.insertCell(11);
        var e5 = document.createElement("input");
        e5.min="0"
        e5.type="number"
        e5.name="PC" + PCid + "natks"
        e5.setAttribute("oninput", "sim1v1(" + PCid + ")")
        e5.placeholder="Times per turn"
        e5.value="1"
        cell7.appendChild(e5)

        // Add input for the damage type as 8th element

        var cell8 = row.insertCell(12);
        var e3 = document.createElement("select");
        e3.name="PC" + PCid + "atktype"
        e3.setAttribute("class", "form-select form-select-sm")

        // Adding all the options to the select

        var a = document.createElement("option");
        var b = document.createTextNode("---Type---");
        a.disabled=true;
        a.selected=true;
        a.value=""
        a.appendChild(b);
        e3.appendChild(a);

        var c = document.createElement("option");
        var d = document.createTextNode("Bludgeoning");
        c.value="bludgeoning"
        c.appendChild(d);
        e3.appendChild(c);

        var e = document.createElement("option");
        var f = document.createTextNode("Slashing");
        e.value="slashing"
        e.appendChild(f);
        e3.appendChild(e);

        var g = document.createElement("option");
        var h = document.createTextNode("Piercing");
        g.value="piercing"
        g.appendChild(h);
        e3.appendChild(g);

        var i = document.createElement("option");
        var j = document.createTextNode("Fire");
        i.value="fire"
        i.appendChild(j);
        e3.appendChild(i);

        var k = document.createElement("option");
        var l = document.createTextNode("Cold");
        k.value="cold"
        k.appendChild(l);
        e3.appendChild(k);

        var m = document.createElement("option");
        var n = document.createTextNode("Lightning");
        m.value="lightning"
        m.appendChild(n);
        e3.appendChild(m);

        var o = document.createElement("option");
        var p = document.createTextNode("Thunder");
        o.value="thunder"
        o.appendChild(p);
        e3.appendChild(o);

        var q = document.createElement("option");
        var r = document.createTextNode("Force");
        q.value="force"
        q.appendChild(r);
        e3.appendChild(q);

        var s = document.createElement("option");
        var t = document.createTextNode("Radiant");
        s.value="radiant"
        s.appendChild(t);
        e3.appendChild(s);

        var u = document.createElement("option");
        var v = document.createTextNode("Necrotic");
        u.value="necrotic"
        u.appendChild(v);
        e3.appendChild(u);

        var w = document.createElement("option");
        var x = document.createTextNode("Poison");
        w.value="Poison"
        w.appendChild(x);
        e3.appendChild(w);

        var y = document.createElement("option");
        var z = document.createTextNode("Psychic");
        y.value="psychic"
        y.appendChild(z);
        e3.appendChild(y);

        var c3 = document.createElement("option");
        var d3 = document.createTextNode("Magical-Bludgeoning");
        c3.value="magical-bludgeoning"
        c3.appendChild(d3);
        e3.appendChild(c3);

        var ee = document.createElement("option");
        var f3 = document.createTextNode("Magical-Slashing");
        ee.value="magical-slashing"
        ee.appendChild(f3);
        e3.appendChild(ee);

        var g3 = document.createElement("option");
        var h3 = document.createTextNode("Magical-Piercing");
        g3.value="magical-piercing"
        g3.appendChild(h3);
        e3.appendChild(g3);
        cell8.appendChild(e3)

        var cell9 = row.insertCell(5)

        var AB = document.createElement("input")
        AB.type="number"
        AB.id="PC" + PCid + "AB"
        AB.name="PC" + PCid + "AB"
        AB.placeholder="AB"
        AB.setAttribute("oninput", "sim1v1(" + PCid + ")")
        AB.value=5

        row.setAttribute("data-hasanattack", "true")

        cell9.appendChild(AB)

        // Add buttons to add or remove attacks in the button row

        var buttons_row = document.querySelector("#PC" + PCid + "-0")

        buttons_row.insertCell(5)
        

        var button_cell = buttons_row.insertCell(6)
        

        button_cell.style.textAlign = "left"

        var buttons = document.createElement("div")

        buttons.style.textAlign = "left"

        var addpcatkbutton = document.createElement("button")
        addpcatkbutton.setAttribute("onclick", "addatk_PC(" + PCid + ")")
        addpcatkbutton.innerText="+"
        addpcatkbutton.id="PC" + PCid + "addatk"
        addpcatkbutton.setAttribute("class", "btn btn-success")

        var rmvpcatkbutton = document.createElement("button")
        rmvpcatkbutton.setAttribute("onclick", "rmvatk_PC(" + PCid + "); sim1v1(" + PCid + ")")
        rmvpcatkbutton.innerText="-"
        rmvpcatkbutton.id="PC" + PCid + "rmvatk"
        rmvpcatkbutton.setAttribute("class", "btn btn-danger")

        buttons.appendChild(addpcatkbutton)
        buttons.appendChild(rmvpcatkbutton)

        button_cell.appendChild(buttons)



        $("#PC" + PCid + "rmvatk").hide()
                
    }
    else
    {
        var atknum = 0

        var PCrows = document.getElementsByName("PC" + PCid + "row")

        for (var i = 0; i < PCrows.length; i++)
        {
            if (PCrows[i].querySelector("input[name='PC" + PCid + "dnum']"))
            {
                atknum++
            }
        }

        for (var g = 0; g < atknum; g++)
        {
            rmvatk_PC(PCid)
        }

        rmvatk_PC(PCid)

        $("#PC" + PCid + "addatk").remove()

        $("#PC" + PCid + "rmvatk").remove()

        $("#PC" + PCid + "AB").remove()



        var classes = document.getElementsByName("class")

        var thereisamartial = false

        for (var h = 0; h < classes.length; h++)
        {
            if (classes[h].value == "martial")
            {
                thereisamartial = true

                break
            }
        }

        if (!(thereisamartial))
        {
            $("#attack_bonus_PCsshow").hide()
        }
    }
    
}

function addatk_PC(PCid){

    var table = document.getElementById("PCsbody")

    var PCrows = table.querySelectorAll("tr[name='PC" + PCid + "row']")

    var rows = table.querySelectorAll("tr")

    var PCs = table.querySelectorAll("tr[name='PC']")



    for (var  j = 0; j < PCrows.length; j++)
    {

        var temprow = PCrows[j]

        if (!(temprow.querySelector("input[name='PC" + PCid + "dnum']")) && temprow.getAttribute("id") != "PC" + PCid + "-0")
        {

            var row = temprow

            row.insertCell(4)

            break;

        }
        else if (temprow.getAttribute("id") == "PC" + PCid + "-0")
        {
            var row = table.insertRow(temprow.rowIndex - 1)

            row.setAttribute("data-hasaresistance", "false")
            
            row.insertCell(0)

            row.insertCell(1)

            row.insertCell(2)

            row.insertCell(3)

            row.insertCell(4)
        }
    }
    

    row.name="PC" + PCid + "row"
    row.id="PC" + PCid + "-" + PCrows.length
    row.setAttribute("data-hasanattack", "true")
    row.setAttribute("name", "PC" + PCid + "row")


    

    var cell1 = row.insertCell(5);
    var e1 = document.createElement("input");
    e1.min="0"
    e1.type="number"
    e1.name="PC" + PCid + "dnum"
    e1.setAttribute("oninput", "doo()")
    e1.placeholder="N of Dice"
    e1.value="1"
    cell1.appendChild(e1)
    cell1.name="dnumcell"

    // 2nd element is just the letter d
    var cell2 = row.insertCell(6)
    var d = document.createTextNode("d")
    cell2.appendChild(d)

    // 3rd element is input for the size of the dice
    var cell3 = row.insertCell(7);
    var e2 = document.createElement("select");
    e2.name="PC" + PCid + "size"
    e2.setAttribute("onchange", "doo()")
    e2.setAttribute("class", "form-select form-select-sm")

    // Adding all the options to the select

    var z = document.createElement("option");
    var t = document.createTextNode("--Size--");
    z.disabled=true;
    z.selected=true;
    z.value=0
    z.appendChild(t);
    e2.appendChild(z);

    var a = document.createElement("option");
    var b = document.createTextNode("4");
    a.appendChild(b);
    a.value=2.5
    e2.appendChild(a)

    var c = document.createElement("option");
    var d = document.createTextNode("6");
    c.appendChild(d);
    c.value=3.5
    e2.appendChild(c);

    var e = document.createElement("option");
    var f = document.createTextNode("8");
    e.appendChild(f);
    e.value=4.5
    e2.appendChild(e);

    var g = document.createElement("option");
    var h = document.createTextNode("10");
    g.appendChild(h);
    g.value=5.5
    e2.appendChild(g);

    var i = document.createElement("option");
    var j = document.createTextNode("12");
    i.appendChild(j);
    i.value=6.5
    e2.appendChild(i);

    var k = document.createElement("option");
    var l = document.createTextNode("20");
    k.appendChild(l);
    k.value=10.5
    e2.appendChild(k);

    cell3.appendChild(e2)

    // Write + as 4th element 
    var cell4 = row.insertCell(8)
    var plus = document.createTextNode("+")
    cell4.appendChild(plus)

    // Add the damage bonus input as the 5th element
    var cell5 = row.insertCell(9);
    var e4 = document.createElement("input");
    e4.min="0"
    e4.type="number"
    e4.name="PC" + PCid + "DB"
    e4.setAttribute("oninput", "doo()")
    e4.placeholder="Damage Bonus"
    e4.value="0"
    cell5.appendChild(e4)

    //Write x as 6th element
    var cell6 = row.insertCell(10)
    var x = document.createTextNode("x")
    cell6.appendChild(x)

    // Add input number of times the attack is done as 7th element
    var cell7 = row.insertCell(11);
    var e5 = document.createElement("input");
    e5.min="0"
    e5.type="number"
    e5.name="PC" + PCid + "natks"
    e5.setAttribute("oninput", "doo()")
    e5.placeholder="Times per turn"
    e5.value="1"
    cell7.appendChild(e5)

    // Add input for the damage type as 8th element

    var cell8 = row.insertCell(12);
    var e3 = document.createElement("select");
    e3.name="PC" + PCid + "atktype"
    e3.setAttribute("class", "form-select form-select-sm")

    // Adding all the options to the select

    var a = document.createElement("option");
    var b = document.createTextNode("---Type---");
    a.disabled=true;
    a.selected=true;
    a.value=""
    a.appendChild(b);
    e3.appendChild(a);

    var c = document.createElement("option");
    var d = document.createTextNode("Bludgeoning");
    c.value="bludgeoning"
    c.appendChild(d);
    e3.appendChild(c);

    var e = document.createElement("option");
    var f = document.createTextNode("Slashing");
    e.value="slashing"
    e.appendChild(f);
    e3.appendChild(e);

    var g = document.createElement("option");
    var h = document.createTextNode("Piercing");
    g.value="piercing"
    g.appendChild(h);
    e3.appendChild(g);

    var i = document.createElement("option");
    var j = document.createTextNode("Fire");
    i.value="fire"
    i.appendChild(j);
    e3.appendChild(i);

    var k = document.createElement("option");
    var l = document.createTextNode("Cold");
    k.value="cold"
    k.appendChild(l);
    e3.appendChild(k);

    var m = document.createElement("option");
    var n = document.createTextNode("Lightning");
    m.value="lightning"
    m.appendChild(n);
    e3.appendChild(m);

    var o = document.createElement("option");
    var p = document.createTextNode("Thunder");
    o.value="thunder"
    o.appendChild(p);
    e3.appendChild(o);

    var q = document.createElement("option");
    var r = document.createTextNode("Force");
    q.value="force"
    q.appendChild(r);
    e3.appendChild(q);

    var s = document.createElement("option");
    var t = document.createTextNode("Radiant");
    s.value="radiant"
    s.appendChild(t);
    e3.appendChild(s);

    var u = document.createElement("option");
    var v = document.createTextNode("Necrotic");
    u.value="necrotic"
    u.appendChild(v);
    e3.appendChild(u);

    var w = document.createElement("option");
    var x = document.createTextNode("Poison");
    w.value="Poison"
    w.appendChild(x);
    e3.appendChild(w);

    var y = document.createElement("option");
    var z = document.createTextNode("Psychic");
    y.value="psychic"
    y.appendChild(z);
    e3.appendChild(y);

    var c3 = document.createElement("option");
    var d3 = document.createTextNode("Magical-Bludgeoning");
    c3.value="magical-bludgeoning"
    c3.appendChild(d3);
    e3.appendChild(c3);

    var ee = document.createElement("option");
    var f3 = document.createTextNode("Magical-Slashing");
    ee.value="magical-slashing"
    ee.appendChild(f3);
    e3.appendChild(ee);

    var g3 = document.createElement("option");
    var h3 = document.createTextNode("Magical-Piercing");
    g3.value="magical-piercing"
    g3.appendChild(h3);
    e3.appendChild(g3);
    cell8.appendChild(e3)

    row.insertCell(5)

    $("#PC" + PCid + "rmvatk").show()
}

function rmvatk_PC(PCid){

    var attacks = document.querySelectorAll("[name='PC" + PCid + "size']")

    var element = attacks[attacks.length - 1]

    var row = element.parentElement.parentElement

    if (row.querySelectorAll("[name='PC" + PCid + "res']")[0])
    {
        for (var g = 0; g < 8; g++)
        {
            row.deleteCell(13 - g)
        }
    }
    else
    {
        row.remove()
    }

    

    if (attacks.length == 2)
    {
        $("#PC" + PCid + "rmvatk").hide()
    }

    doo()
    
}

function addtrait() {

    var original_row = document.querySelector("#addtrait").parentNode.parentNode.parentNode
    
    var index = (original_row.rowIndex - 1)

    var table = document.querySelector("#traitsbody")

    var traits = table.querySelectorAll("select").length

    var row = table.insertRow(index)
    row.name="trait_row"
    row.id="trait" + traits

    var cell1 = row.insertCell(0);
    cell1.setAttribute("name", "traitCell")
    var e3 = document.createElement("select");
    e3.setAttribute("name", "trait")
    e3.setAttribute("onchange", "load_trait(this)")
    e3.setAttribute("class", "form-select form-select-sm")

    // Adding all the options to the select

    var a = document.createElement("option");
    var b = document.createTextNode("--Trait--");
    a.disabled=true;
    a.selected=true;
    a.value=""
    a.appendChild(b);
    e3.appendChild(a);

    $.ajax({
        
        type : "POST",

        url : "/traits",

        processData : true,

        data : {
        }
        
    })

    .done(function(data) {
        
        var list = data["traits"]

        for (var i = 0; i < list.length; i++)
        {
            var trait = list[i]

            var option = document.createElement("option");
            var text = document.createTextNode(trait);
            option.value="" + trait
            option.appendChild(text);
            e3.appendChild(option);
        }

        cell1.appendChild(e3)

        if (traits != 0)
        {
            var rmvtrait = document.getElementById("rmvtrait")

            rmvtrait.style.visibility = "visible"
        }
        

    })

    

    
}

function load_trait(select) {

    var trait = select.value

    var row = select.parentNode.parentNode

    $.ajax({
        
        type : "POST",

        url : "/load_trait",

        processData : true,

        data : {
            "trait": trait
        }
        
    })

    .done(function(data) {

        if (row.cells[1])
        {
            row.deleteCell(3)

            row.deleteCell(2)

            row.deleteCell(1)
        }



        var cell2 = row.insertCell(1);
        cell2.setAttribute("name", "descriptionCell")
        var description = document.createElement("h4")
        description.textContent = data["description"]
        description.setAttribute("name", "description")

        cell2.appendChild(description)

        var cell3 = row.insertCell(2);
        cell3.setAttribute("name", "exampleCell")
        var example = document.createElement("h4")
        example.textContent = data["example"]
        example.setAttribute("name", "example")

        cell3.appendChild(example)

        

        var cell4 = row.insertCell(3);
        cell4.setAttribute("name", "effect_on_CRCell")
        var effect_on_CR = document.createElement("h4")
        effect_on_CR.textContent = data["effect_on_CR"]
        effect_on_CR.setAttribute("name", "effect_on_CR")

        cell4.appendChild(effect_on_CR)
    })

}

function rmvtrait() {

    var table = document.querySelector("#traitsbody")

    var traits = document.getElementsByName("trait")

    var remove = table.querySelector("#trait" + (traits.length - 1))

    remove.remove()

    if (traits.length == 1)
    {
        var rmvtrait = document.getElementById("rmvtrait")

        rmvtrait.style.visibility = "hidden"
    }
}

function decent_text(array_of_words)
{
    if (array_of_words == undefined)
    {
        return
    }
    else if (array_of_words[0] == "")
    {
        return
    }

    var maintext = ""

    var len = array_of_words.length

    if (len == 1)
    {
        return array_of_words[0]
    }

    for (var i = 0; i < len; i++)
    {
        var word = array_of_words[i]

        if (word == "" || word == undefined)
        {
            continue
        }
        else
        {

            var new_word = ""

            if (i == (len - 1))
            {
                new_word = " or " + word
            }
            else if (i == (len - 2))
            {
                new_word = word
            }
            else
            {
                new_word = word + ", "
            }
        }

        maintext = maintext + new_word
        
    }

    return maintext
}

function tips_and_info() {

    $("#body1").css("visibility", "hidden")
    
    $("#tipsandinfo").css("visibility", "visible")

    $("#tipsandinfobtn").css("visibility", "hidden")

    $("#goback").css("visibility", "visible")

    
}

function go_back() {
    
    $("#tipsandinfo").css("visibility", "hidden")

    $("#body1").css("visibility", "visible")

    $("#goback").css("visibility", "hidden")

    $("#tipsandinfobtn").css("visibility", "visible")


}