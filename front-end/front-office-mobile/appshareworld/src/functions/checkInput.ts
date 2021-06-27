const EMAIL_REGEX =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;

/**
 * Check if value email match with rules of regex 
 * @param {string} mail - user mail 
 * @returns {boolean} return true if match with regex
 */
export const checkMail = (mail:string) => {
return EMAIL_REGEX.test(mail) ;
}

/**
 * Check if value password match with rules of regex 
 * @param {string} password - user password
 * @returns {boolean} return true if match with regex
 */
export const checkPassword = (password:string) => {
return PASSWORD_REGEX.test(password);
}

/**
 * check value it's not null or if size respect lenMin and lenMax 
 * @param {string} str - user required input  
 * @param {number} lenMin - value size minimum
 * @param {number} lenMax - value size maximum
 * @returns {boolean}  size it's size is correct
 */
export const checkStr = (str: string, lenMin: number, lenMax: number) => {
    const size = str.length
    return (str !== "" && size >= lenMin && size <= lenMax);
}