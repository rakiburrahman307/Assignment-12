import { Helmet } from "react-helmet";
import PropTypes from 'prop-types';
const PageHelmet = ({title}) => {
    return (
        <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
    </Helmet>
    );
};
PageHelmet.propTypes = {
    title:PropTypes.object
}
export default PageHelmet;