import React, { useEffect, useRef, useState } from "react";
import './index.css'

const OTP = () => {
    const [n, setN] = useState('')
    const [showOtpField, setShowOtpField] = useState(false)
    const [array, setArray] = useState([])
    let obj
    const [otps, setOtps] = useState({})
    const inputRef = useRef([])

    useEffect(() => {
        setArray(new Array(Number(n)).fill([]))
        obj = array.reduce((acc, curr, i) => {
            acc[i] = ''
            return acc
        }, {})
        setOtps(obj)
    }, [n])

    const handleInputChange = ({ e, i }) => {
        const num = e.target.value.slice(-1)
        setOtps(prev => {
            return {
                ...prev,
                [i]: num
            }
        })

        if (num.length) {
            if (i < n - 1) {
                for (let k = i + 1; k < n; k++) {
                    const element = inputRef[k]
                    if (element.value === '') {
                        element.focus()
                        return
                    }
                }
            } else {
                for (let k = 0; k < i; k++) {
                    const element = inputRef[k]
                    if (element.value === '') {
                        element.focus()
                        return
                    }
                }
            }
        }
    }

    const handleSubmit = () => {
        setShowOtpField(true)
    }

    const handleInputFieldChange = (e) => {
        setN(e.target.value)
    }

    const handleKeyDown = ({ e, i }) => {
        if (i != 0) {
            if (e.key === 'Backspace') {
                setOtps(prev => {
                    return {
                        ...prev,
                        [i]: ''
                    }
                })
                setTimeout(() => {
                    const element = inputRef[i - 1]
                    element.focus()
                }, 0);
            }
        }
    }

    return !showOtpField ? (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            gap: '6px'
        }}>
            <h1>Select the length of OTP input</h1>
            <form onSubmit={handleSubmit}>
                <input max='9' type="number" onChange={handleInputFieldChange} />
                <button type="submit">Submit</button>
            </form>
        </div>
    ) : <div className="otpParent">
        {array.map((arr, i) => {
            return (
                <div>
                    <input ref={e => inputRef[i] = e}
                        className={i}
                        value={otps[i]}
                        onChange={(e) => handleInputChange({ e, i })}
                        onKeyDown={(e) => handleKeyDown({ e, i })}
                    />
                </div>
            )
        })}
    </div>
};

export default OTP;
