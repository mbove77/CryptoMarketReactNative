class Currency {
    static instance = new Currency();

    format = (amount) => {
        return Number(amount)
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, '$&,');
    };

}
export default Currency
