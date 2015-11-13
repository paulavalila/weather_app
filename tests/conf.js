exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['todo-spec.js'],
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
     args: ['--no-sandbox'] 
 }   
}
};