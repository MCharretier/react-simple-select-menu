import React, { useState, useEffect, useMemo, useCallback } from 'react'
import styles from './styles.module.css'

/**
 * SelectMenu component renders a custom dropdown menu.
 *
 * @component
 * @param {Object[]} options - The array of option objects to display in the menu.
 * @param {string} options[].value - The value of the option.
 * @param {string} options[].label - The label of the option.
 * @param {Object} [defaultValue] - The default selected option.
 * @param {string} defaultValue.value - The value of the default option.
 * @param {string} defaultValue.label - The label of the default option.
 * @param {function} [onChange] - The callback function to call when the selected option changes.
 * @returns {JSX.Element} The rendered SelectMenu component.
 */
function SelectMenu({ options, defaultValue, onChange }) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState(defaultValue)

    useEffect(() => {
        setSelectedOption(defaultValue)
    }, [defaultValue])

    const memoizedOptions = useMemo(() => options, [options])

    const handleOptionClick = useCallback(
        (option) => {
            setSelectedOption(option)
            setIsOpen(false)
            if (onChange) {
                onChange(option.value)
            }
        },
        [onChange]
    )

    const handleSelectChange = useCallback(
        (e) => {
            const selectedValue = e.target.value
            const selected = memoizedOptions.find(
                (option) => option.value === selectedValue
            )
            setSelectedOption(selected)
            if (onChange) {
                onChange(selected.value)
            }
        },
        [memoizedOptions, onChange]
    )

    const toggleMenu = useCallback(() => {
        setIsOpen((prev) => !prev)
    }, [])

    return (
        <div className={styles.selectMenu}>
            <div
                className={`${styles.selectMenuHeader} ${
                    isOpen ? styles.open : ''
                }`}
                onClick={toggleMenu}
                tabIndex="0"
            >
                {selectedOption ? selectedOption.label : 'Select an option'}
            </div>
            {isOpen && (
                <ul className={styles.selectMenuOptions}>
                    {memoizedOptions.map((option) => (
                        <li
                            key={option.value}
                            className={styles.selectMenuOption}
                            onClick={() => handleOptionClick(option)}
                            tabIndex="0"
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
            <select
                style={{ display: 'none' }}
                value={selectedOption ? selectedOption.value : ''}
                onChange={handleSelectChange}
            >
                {memoizedOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectMenu
