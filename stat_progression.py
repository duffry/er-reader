def get_hp(lvl):

    hp = {
        1: 300,
        2: 304,
        3: 312,
        4: 322,
        5: 334,
        6: 347,
        7: 362,
        8: 378,
        9: 396,
        10: 414,
        11: 434,
        12: 455,
        13: 476,
        14: 499,
        15: 522,
        16: 547,
        17: 572,
        18: 598,
        19: 624,
        20: 652,
        21: 680,
        22: 709,
        23: 738,
        24: 769,
        25: 800,
        26: 833,
        27: 870,
        28: 910,
        29: 951,
        30: 994,
        31: 1037,
        32: 1081,
        33: 1125,
        34: 1170,
        35: 1216,
        36: 1262,
        37: 1308,
        38: 1355,
        39: 1402,
        40: 1450,
        41: 1476,
        42: 1503,
        43: 1529,
        44: 1555,
        45: 1581,
        46: 1606,
        47: 1631,
        48: 1656,
        49: 1680,
        50: 1704,
        51: 1727,
        52: 1750,
        53: 1772,
        54: 1793,
        55: 1814,
        56: 1834,
        57: 1853,
        58: 1871,
        59: 1887,
        60: 1900,
        61: 1906,
        62: 1912,
        63: 1918,
        64: 1924,
        65: 1930,
        66: 1936,
        67: 1942,
        68: 1948,
        69: 1954,
        70: 1959,
        71: 1965,
        72: 1971,
        73: 1977,
        74: 1982,
        75: 1988,
        76: 1993,
        77: 1999,
        78: 2004,
        79: 2010,
        80: 2015,
        81: 2020,
        82: 2026,
        83: 2031,
        84: 2036,
        85: 2041,
        86: 2046,
        87: 2051,
        88: 2056,
        89: 2060,
        90: 2065,
        91: 2070,
        92: 2074,
        93: 2078,
        94: 2082,
        95: 2086,
        96: 2090,
        97: 2094,
        98: 2097,
        99: 2100,
    }
    return hp.get(lvl)


def get_fp(lvl):

    fp = {
        1: 40,
        2: 43,
        3: 46,
        4: 49,
        5: 52,
        6: 55,
        7: 58,
        8: 62,
        9: 65,
        10: 68,
        11: 71,
        12: 74,
        13: 77,
        14: 81,
        15: 84,
        16: 87,
        17: 90,
        18: 93,
        19: 96,
        20: 100,
        21: 106,
        22: 112,
        23: 118,
        24: 124,
        25: 130,
        26: 136,
        27: 142,
        28: 148,
        29: 154,
        30: 160,
        31: 166,
        32: 172,
        33: 178,
        34: 184,
        35: 190,
        36: 196,
        37: 202,
        38: 208,
        39: 214,
        40: 220,
        41: 226,
        42: 232,
        43: 238,
        44: 244,
        45: 250,
        46: 256,
        47: 262,
        48: 268,
        49: 274,
        50: 280,
        51: 288,
        52: 297,
        53: 305,
        54: 313,
        55: 321,
        56: 328,
        57: 335,
        58: 341,
        59: 346,
        60: 350,
        61: 352,
        62: 355,
        63: 357,
        64: 360,
        65: 362,
        66: 365,
        67: 367,
        68: 370,
        69: 373,
        70: 375,
        71: 378,
        72: 380,
        73: 383,
        74: 385,
        75: 388,
        76: 391,
        77: 393,
        78: 396,
        79: 398,
        80: 401,
        81: 403,
        82: 406,
        83: 408,
        84: 411,
        85: 414,
        86: 416,
        87: 419,
        88: 421,
        89: 424,
        90: 426,
        91: 429,
        92: 432,
        93: 434,
        94: 437,
        95: 439,
        96: 442,
        97: 444,
        98: 447,
        99: 450,
    }
    return fp.get(lvl)


def get_st(lvl):

    stamina = {
        1: 80,
        2: 81,
        3: 82,
        4: 84,
        5: 85,
        6: 87,
        7: 88,
        8: 90,
        9: 91,
        10: 92,
        11: 94,
        12: 95,
        13: 97,
        14: 98,
        15: 100,
        16: 101,
        17: 103,
        18: 105,
        19: 106,
        20: 108,
        21: 110,
        22: 111,
        23: 113,
        24: 115,
        25: 116,
        26: 118,
        27: 120,
        28: 121,
        29: 123,
        30: 125,
        31: 126,
        32: 128,
        33: 129,
        34: 131,
        35: 132,
        36: 134,
        37: 135,
        38: 137,
        39: 138,
        40: 140,
        41: 141,
        42: 143,
        43: 144,
        44: 146,
        45: 147,
        46: 149,
        47: 150,
        48: 152,
        49: 153,
        50: 155,
        51: 155,
        52: 155,
        53: 155,
        54: 156,
        55: 156,
        56: 156,
        57: 157,
        58: 157,
        59: 157,
        60: 158,
        61: 158,
        62: 158,
        63: 158,
        64: 159,
        65: 159,
        66: 159,
        67: 160,
        68: 160,
        69: 160,
        70: 161,
        71: 161,
        72: 161,
        73: 162,
        74: 162,
        75: 162,
        76: 162,
        77: 163,
        78: 163,
        79: 163,
        80: 164,
        81: 164,
        82: 164,
        83: 165,
        84: 165,
        85: 165,
        86: 166,
        87: 166,
        88: 166,
        89: 166,
        90: 167,
        91: 167,
        92: 167,
        93: 168,
        94: 168,
        95: 168,
        96: 169,
        97: 169,
        98: 169,
        99: 170,
    }
    return stamina.get(lvl)