import readline from 'readline';
import store from './store';

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var recursiveAsyncReadLine = function () {
  rl.question('DebugCommand: ', function (answer) {

    switch(answer)
    {
        case 'exit':
            rl.close();
            break;

        case 'state':
            console.log(store.state);

        default:
    }

    recursiveAsyncReadLine(); //Calling this function again to ask new question
  });
};

export default recursiveAsyncReadLine;
