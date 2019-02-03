class Formatter{
  static money(amount){
    return "$ "+amount.toLocaleString("en-CA");
  }
}

export default Formatter
