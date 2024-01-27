$(document).ready(function () {
    // Load currency codes and rates from the JSON file
    $.getJSON('exchange-data.json', function (data) {
        var currencies = data.currencies;

        // Bind currency codes to the select dropdowns
        $(".currency-one, .currency-two").html('');
        for (var i = 0; i < currencies.length; i++) {
            $(".currency-one, .currency-two").append('<option value="' + currencies[i].code + '">' + currencies[i].code + '</option>');
        }

        // Write your app logic below this line
        $('#convert-currency-btn').on('click', function () {
            // Get currency values from the dropdowns
            var currencyOne = $(".currency-one").val();
            var currencyTwo = $(".currency-two").val();

            // Validate if both the currencies are the same
            // If they are the same, throw an error
            if (currencyOne === currencyTwo) {
                alert("Please choose two different currencies!");
                return;
            }

            // Bind currency symbols in the result container right away
            $('#cr-one-symbol').text(currencyOne);
            $('#cr-two-symbol').text(currencyTwo);

            // Get conversion rates from the currencies JSON
            var rateOne = getConversionRate(currencies, currencyOne);
            var rateTwo = getConversionRate(currencies, currencyTwo);

            // Calculate the conversion rate
            var conversionRate = rateOne / rateTwo;

            // Simulate a conversion result (since the API is not working)
            var convertedValue = (1 / conversionRate).toFixed(2);

            // Bind the currency count to the respective element
            $('#cr-two-count').text(convertedValue);

            // Finally, show the result (Result elem is hidden by default)
            $('#result').fadeIn(400);
        });

        // Hide the result container when dropdown value changes
        $(".currency-one, .currency-two").on("change", function () {
            $('#result').hide();
        });
    });
});

// Helper function to get conversion rate for a specific currency
function getConversionRate(currencies, code) {
    for (var i = 0; i < currencies.length; i++) {
        if (currencies[i].code === code) {
            return currencies[i].rate;
        }
    }
    return 1; // Default to 1 if code not found (same currency)
}