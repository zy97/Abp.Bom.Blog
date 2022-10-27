import { SettingConst } from "../data/const/setting";

export const transformToArray = (data: any) => {
    return Object.entries(data).map(([key, value]) => {
        let valueStr = value + "";
        console.log(valueStr);
        valueStr = valueStr.replace(/,/g, "");
        return { name: key, value: valueStr };
    })
}

export const transformToZH = (key: string) => {
    return SettingConst[key];
}