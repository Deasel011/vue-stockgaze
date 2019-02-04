class Formatter{
  static money(amount){
    if(amount)
    return "$ "+amount.toLocaleString("en-CA");
    else return ""
  }
}

export default Formatter
