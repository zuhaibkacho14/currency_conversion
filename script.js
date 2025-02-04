const fromCurrencySelect = document.getElementById('from-currency');
        const toCurrencySelect = document.getElementById('to-currency');
        const amountInput = document.getElementById('amount');
        const rateMessage = document.getElementById('rate-message');
        const fromFlag = document.getElementById('from-flag');
        const toFlag = document.getElementById('to-flag');
        const historyList = document.getElementById('history-list');

        // List of currencies and their flags (using currency codes only)
        const currencies = [
            { code: 'USD', flag: 'US' },
            { code: 'EUR', flag: 'EU' },
            { code: 'GBP', flag: 'GB' },
            { code: 'INR', flag: 'IN' },
            { code: 'AUD', flag: 'AU' },
            { code: 'CAD', flag: 'CA' },
            { code: 'JPY', flag: 'JP' },
            { code: 'CHF', flag: 'CH' },
            { code: 'CNY', flag: 'CN' },
            { code: 'MXN', flag: 'MX' },
            { code: 'PKR', flag: 'PK' },
            { code: 'SGD', flag: 'SG' },
            { code: 'HKD', flag: 'HK' },
            { code: 'NZD', flag: 'NZ' },
            { code: 'SEK', flag: 'SE' },
            { code: 'NOK', flag: 'NO' },
            { code: 'TRY', flag: 'TR' },
            { code: 'SAR', flag: 'SA' },
            { code: 'AED', flag: 'AE' },
            { code: 'ZAR', flag: 'ZA' },
            { code: 'BRL', flag: 'BR' },
            { code: 'RUB', flag: 'RU' },
            { code: 'THB', flag: 'TH' },
            { code: 'MYR', flag: 'MY' },
            { code: 'KRW', flag: 'KR' },
            { code: 'IDR', flag: 'ID' },
            { code: 'ILS', flag: 'IL' },
            { code: 'CLP', flag: 'CL' },
            { code: 'COP', flag: 'CO' },
            { code: 'HUF', flag: 'HU' }
        ];

        // Function to populate the currency dropdowns
        function populateCurrencyDropdowns() {
            currencies.forEach(currency => {
                const optionFrom = document.createElement('option');
                optionFrom.value = currency.code;
                optionFrom.textContent = currency.code; // Use currency code
                fromCurrencySelect.appendChild(optionFrom);

                const optionTo = document.createElement('option');
                optionTo.value = currency.code;
                optionTo.textContent = currency.code; // Use currency code
                toCurrencySelect.appendChild(optionTo);
            });

            fromCurrencySelect.value = 'USD';  // Default "From" currency
            toCurrencySelect.value = 'PKR';    // Default "To" currency
            updateFlag('USD', 'PKR');
        }

        // Update the flag based on selected currency
        function updateFlag(fromCurrency, toCurrency) {
            const from = currencies.find(c => c.code === fromCurrency);
            const to = currencies.find(c => c.code === toCurrency);
            fromFlag.src = `https://flagsapi.com/${from.flag}/flat/64.png`;
            toFlag.src = `https://flagsapi.com/${to.flag}/flat/64.png`;
        }

        // Fetch the exchange rate and perform conversion
        async function fetchExchangeRate() {
            const fromCurrency = fromCurrencySelect.value;
            const toCurrency = toCurrencySelect.value;
            const amount = parseFloat(amountInput.value);

            const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
            const data = await response.json();
            const rate = data.rates[toCurrency];
            const convertedAmount = (amount * rate).toFixed(2);

            // Update the rate message and the converted amount
            rateMessage.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;

           
        }
        // Handle form submission
        document.getElementById('currency-form').addEventListener('submit', function(event) {
            event.preventDefault();
            fetchExchangeRate();
        });

        // Handle change in "From" or "To" currency dropdown
        fromCurrencySelect.addEventListener('change', function() {
            updateFlag(fromCurrencySelect.value, toCurrencySelect.value);
        });

        toCurrencySelect.addEventListener('change', function() {
            updateFlag(fromCurrencySelect.value, toCurrencySelect.value);
        });

        // Initialize currencies and history
         populateCurrencyDropdowns();
       