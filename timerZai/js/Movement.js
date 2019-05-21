class Movement {
    constructor() {}

    uMove(pieceTable) {
        let tab = []
        tab[0] = pieceTable[0]
        pieceTable[0] = pieceTable[1]
        pieceTable[1] = pieceTable[2]
        pieceTable[2] = pieceTable[3]
        pieceTable[3] = tab[0]

        return pieceTable;
    }
}