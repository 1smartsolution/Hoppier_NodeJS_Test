fetch('https://s3.amazonaws.com/misc-file-snack/MOCK_SNACKER_DATA.json')
.then(response => response.json())
.then(
    data => {
        fetch('https://ca.desknibbles.com/products.json?limit=250')
        .then(response => response.json())
        .then(
            data2 => 
            {
                const fave_snacks = data.map(item => item.fave_snack);

                const prodTitles = data2.products.map(item => item.title);

                const commonFaveSnacks = data.filter(item => prodTitles.includes(item.fave_snack));

                const distinct_snacks = [... new Set(commonFaveSnacks.map(item => item.fave_snack))];

                const distinct_emails = [... new Set(commonFaveSnacks.map(item => item.email))];

                const intersectionSnacks = data2.products.filter(item => fave_snacks.includes(item.title));
                const totalPrice = intersectionSnacks.reduce(function(result, item) {
                    return result + +(item.variants[0].price);
                }, 0);

                console.log('Response 1:', distinct_snacks);
                console.log('Response 2:', distinct_emails);
                console.log('Response 3: $' + totalPrice);
            }
        )
    }
);
