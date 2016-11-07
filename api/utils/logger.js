import PrettyError from 'pretty-error';
const pretty = new PrettyError();

module.exports = {
  logEvent: (procName, message) => {
    console.log('[API Event|' + procName + ']: ' + message);
  },

  logError: (procName, error) => {
    console.error('[API ERROR|' + procName + ']: ' + pretty.render(error));
  }
};
