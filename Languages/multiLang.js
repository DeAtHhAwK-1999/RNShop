import React, { useContext, useState } from "react";
import ar from "./ar/ar.json";
import en from "./en/en.json";

const MTranslate = (word) => {

    if (global.lang == "english") {
        for (let [key, value] of Object.entries(en)) {
            if (word == key) {
                return value;
            }
        }
    }
    if (global.lang == "arabic") {
        for (let [key, value] of Object.entries(ar)) {
            if (word == key) {
                return value;
            }
        }
    }
}

export default MTranslate;