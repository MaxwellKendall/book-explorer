import createHistory from 'history/createBrowserHistory';

const configureHistory = () => createHistory({ basename: BASENAME });

export default configureHistory;
