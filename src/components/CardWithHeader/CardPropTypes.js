import PropTypes from 'prop-types'

export default {
  link: PropTypes.object,
  title: PropTypes.string.isRequired,
  secondaryTitle: PropTypes.string,
  titleOnly: PropTypes.bool.isRequired,
  children: PropTypes.any
}
