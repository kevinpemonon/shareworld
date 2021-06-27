// import { checkMail, checkPassword, checkStr } from './../src/functions/checkInput';




// test('Check Functionnal Email', () => {
    
//     expect(checkMail('dugamin.mathias@gmail.com')).toBeTruthy();
//     expect(checkMail('dugamin.mathias@gmail.c')).toBeFalsy();
//     expect(checkMail('d@gmail.com')).toBeTruthy();
//     expect(checkMail('dugamin.mathiasgmail.com')).toBeFalsy();
//     expect(checkMail('dugamin.mathias@gmail')).toBeFalsy();
//     expect(checkMail('dugamin.mat{hias@gmail.com')).toBeTruthy();
//     expect(checkMail('dugamin.?mathias@gmail.com')).toBeTruthy();
//     expect(checkMail('dugamin.mathias@@gmail.com')).toBeFalsy();
//     expect(checkMail('dugamin.mathias@gmail..com')).toBeFalsy();
//     expect(checkMail('dugamin.mathias@dd.gmail.com')).toBeTruthy();
//     expect(checkMail('mathias@gmail.com')).toBeTruthy();
//     expect(checkMail('dug@l.co')).toBeTruthy();
//   });

//   test('Check Functionnal Password', () => {
    
//     expect(checkPassword('Hghs@7')).toBeTruthy();
//     expect(checkPassword('dysij@M')).toBeFalsy();
//     expect(checkPassword('8975uz')).toBeTruthy();
//     expect(checkPassword('hjkdjsk9')).toBeTruthy();
    
//   });
//   test('Check Functionnal String', () => {
    
//     expect(checkStr('jsskskqkh', 4, 8)).toBeFalsy();
//     expect(checkStr('IUUIJ', 6, 10)).toBeFalsy();
   
//   });

 