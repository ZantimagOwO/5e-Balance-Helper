from math import ceil, floor, isnan

def calculate_def_CR(HP, AC):

    # Calculate base def CR using HP
    if HP < 7:
        CR = 0.0

    elif HP < 36:
        CR = 1/8

    elif HP < 50:
        CR = 1/4

    elif HP < 71:
        CR = 1/2

    elif HP < 356:
        CR = ceil((HP - 70.0) / 15.0)
        
    else:
        CR = ceil(19 + ((HP - 355.0) / 45.0))
    

    # Modify the def CR based on AC
    if CR < 4:
        CR +=  ((AC - 13) / 2.0)

    elif CR < 5:
        CR +=  ((AC - 14) / 2.0)

    elif CR < 8:
        CR +=  ((AC - 15) / 2.0)

    elif CR < 10:
        CR +=  ((AC - 16) / 2.0)

    elif CR < 13:
        CR +=  ((AC - 17) / 2.0)

    elif CR < 17:
        CR +=  ((AC - 18) / 2.0)

    else:
        CR +=  ((AC - 19) / 2.0)

    return CR


def calculate_off_CR(DPR, AB):

    # Calculate base def CR using DPR
    if DPR < 2:
        CR = 0.0

    elif DPR < 4:
        CR = 1/8

    elif DPR < 6:
        CR = 1/4

    elif DPR < 9:
        CR = 1/2

    elif DPR < 123:
        CR = ceil((DPR - 8.0) / 6.0)

    else:
        CR = ceil((DPR - 122.0 / 18.0))
    

    # Modify the def CR based on AB
    if CR < 3:
        CR += ((AB - 3) / 2.0)

    elif CR < 4:
        CR += ((AB - 4) / 2.0)

    elif CR < 5:
        CR += ((AB - 5) / 2.0)

    elif CR < 8:
        CR += ((AB - 6) / 2.0)

    elif CR < 11:
        CR += ((AB - 7) / 2.0)

    elif CR < 16:
        CR += ((AB - 8) / 2.0)

    elif CR < 17:
        CR += ((AB - 9) / 2.0)

    elif CR < 21:
        CR += ((AB - 10) / 2.0)

    elif CR < 24:
        CR += ((AB - 11) / 2.0)

    elif CR < 27:
        CR += ((AB - 12) / 2.0)

    elif CR < 30:
        CR += ((AB - 13) / 2.0)

    else:
        CR += ((AB - 14) / 2.0)

    return CR


def calculateDC(CR):
    DC = 13


    if CR < 4:
        DC = 13

    elif CR < 5:
        DC = 14

    elif CR < 8:
        DC = 15

    elif CR < 11:
        DC = 16

    elif CR < 13:
        DC = 17

    elif CR < 17:
        DC = 18

    elif CR < 21:
        DC = 19

    elif CR < 24:
        DC = 20
    
    elif CR < 27:
        DC = 21
    
    elif CR < 30:
        DC = 22

    else:
        CR = 23

    return DC


def calculatePB(CR):
    PB = 0

    if CR < 5:
        PB = 2

    elif CR < 9:
        PB = 3

    elif CR < 13:
        PB = 4

    elif CR < 17:
        PB = 5

    elif CR < 21:
        PB = 7

    elif CR < 25:
        PB = 8

    elif CR < 29:
        PB = 8

    else:
        PB = 9

    return PB

def avg_dmg(size, dice, DB):

    return (((size + 1) / 2.0) * dice) + DB

# This makes sure the value is not a string
def c(a):
    if "." in str(a):
        return float(a)

    elif a == '' or not a:
        return 0

    

    elif str(a).isnumeric:
        return int(a)

    else:
        return 0

def not_neg(n):
    if n < 0:
        return 0
    else:
        return n


