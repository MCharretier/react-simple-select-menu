import { useState, useEffect, useMemo, useCallback } from 'react'
import styles from './styles.module.css'

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
