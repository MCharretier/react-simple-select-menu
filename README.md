# react-simple-select-menu

A simple React menu selection component

## Installation

You can install the package via npm:

```bash
npm install react-simple-select-menu
```

## Usage/Examples

```javascript
import React, { useState } from 'react'
import SelectMenu from 'react-simple-select-menu'

function App() {
    const [selectedOption, setSelectedOption] = useState(null)

    const handleSelectChange = (value) => {
        setSelectedOption(value)
    }

    const options = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' }
    ]

    return (
        <div>
            <SelectMenu
                options={options}
                defaultValue={options[0]}
                onChange={handleSelectChange}
            />
            <p>Selected option: {selectedOption}</p>
        </div>
    )
}

export default App
```

## Configuration

`SelectMenu` does not require extensive configuration. You can customize the appearance and behavior using CSS and props such as `options`, `defaultValue` and `onChange`.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
