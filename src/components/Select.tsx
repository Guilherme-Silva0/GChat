'use client'

import ReactSelect from 'react-select'

interface SelectProps {
  label: string
  value?: Record<string, any>
  onChange: (value: Record<string, any>) => void
  options: Record<string, any>[]
  disabled?: boolean
}

const Select = ({ label, onChange, options, disabled, value }: SelectProps) => {
  return (
    <div className="z-[100]">
      <label className="block text-sm font-medium capitalize leading-6 text-slate-900 transition-all dark:text-gray-200">
        {label}
      </label>
      <div className="mt-2">
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          isMulti
          options={options}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999,
            }),
          }}
          classNames={{
            control: (state) => `text-sm dark:bg-slate-900 `,
            menuList: () => 'dark:bg-slate-700',
            option: (state) => (state.isFocused ? 'dark:bg-slate-900' : ''),
          }}
        />
      </div>
    </div>
  )
}

export default Select
