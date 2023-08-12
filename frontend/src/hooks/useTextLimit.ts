import { useState, useEffect } from 'react';

function useTextLimit(initialText: string, maxLength: number): string {
    const [limitedText, setLimitedText] = useState(initialText);

    useEffect(() => {
        if (initialText.length > maxLength) {
            setLimitedText(initialText.substring(0, maxLength) + '...');
        } else {
            setLimitedText(initialText);
        }
    }, [initialText, maxLength]);

    return limitedText;
}

export default useTextLimit;
