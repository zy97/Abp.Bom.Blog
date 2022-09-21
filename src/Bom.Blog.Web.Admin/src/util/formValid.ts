export function getPhoneValidationRule() {
    return {
        pattern: /^(\+?0?86-?)?1[345789]\d{9}$/,
        message: "请输入正确的手机号码",
    }
}
export function getRequiredRule(tip: string) {
    if (tip.search("请输入") === -1) {
        tip = `请输入${tip}`
    }
    return {
        required: true,
        message: "请输入",
    }
}
export function getEmailValidationRule() {
    return {
        pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
        message: "请输入正确的邮箱",
    }
}
export function getTwoPasswordValidationRule(controlName: string, tip: string) {
    return ({ getFieldValue }) => ({
        validator(_, value) {
            if (!value || getFieldValue(controlName) === value) {
                return Promise.resolve();
            }
            return Promise.reject(new Error(tip));
        },
    })
}