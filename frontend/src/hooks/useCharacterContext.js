import { CharacterContext } from "../context/CharacterContext";
import { useContext } from "react";

export const useCharacterContext = () => {

    const context = useContext(CharacterContext)

    if (!context) {
        throw Error('useCharacterContext must be used inside a CharacterContextProvider')
    }

    return context
}