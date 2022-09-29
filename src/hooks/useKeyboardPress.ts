import { useState, useEffect, KeyboardEvent } from "react";

const useKeyboardPress = (targetKey: string) => {
    const [keyPressed, setKeyPressed] = useState<boolean>(false);

    const keyDownHandler: any = (event: KeyboardEvent<HTMLInputElement>) => {
        // console.log(event);

        if (event.key === targetKey) {

            setKeyPressed(true);
        }
    }
    const keyUpHandler: any = (event: KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === targetKey) {
            setKeyPressed(false);
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", keyDownHandler);
        document.addEventListener("keyup", keyUpHandler);
        return (() => {
            document.removeEventListener("keydown", keyDownHandler);
            document.removeEventListener("keyup", keyUpHandler);
        })
    }, [])

    return keyPressed;
}

export default useKeyboardPress;