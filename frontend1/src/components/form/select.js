import React from "react"
import Form from "react-bootstrap/Form"

const AppFormSelect = ({
  ariaLabel = "",
  className = "",
  placeholderText = false,
  options = [],
  selectedItem = null,
  onChangeCallback = null,
  selectFieldClassName = "",
  ...selectProps
}) => {
  return (
    <Form.Group className={`form-select-wrapper d-flex ${className}`}>
      <Form.Select
        className={selectFieldClassName}
        {...selectProps}
        aria-label={ariaLabel}
        onChange={onChangeCallback}
        defaultValue={selectedItem}
      >
        {placeholderText && <option>{placeholderText}</option>}
        {options.map((optionItem, i) => (
          <option value={optionItem?.value} key={i}>
            {optionItem?.label}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  )
}
export default AppFormSelect
