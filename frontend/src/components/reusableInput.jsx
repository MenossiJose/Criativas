import PropTypes from 'prop-types';

const ReusableInput = ({ type, name, placeholder, value, onChange }) => {
    return (
        <div className="input-container">
            <label htmlFor={name}>{placeholder}</label>
            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="reusable-input"
            />
        </div>
    );
};
ReusableInput.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default ReusableInput;
