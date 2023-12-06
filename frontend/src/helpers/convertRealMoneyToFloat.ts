function convertRealMoneyToFloat(str: string) {
  // Remover o prefixo "R$ " e substituir a vírgula por ponto
  var valorFormatado = str.replace("R$ ", "").replace(/\./g, "").replace(",", ".");
    console.log()
  // Converter a string formatada para float
  var valorFloat = parseFloat(valorFormatado);

  // Retornar o resultado
  return valorFloat;
}

export { convertRealMoneyToFloat };
