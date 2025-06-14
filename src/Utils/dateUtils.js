// Função para corrigir a data  vindo do banco de dados (no formato 'YYYY-MM-DD')

const parseDateBd = (dataString) => {
    let [ano, mes, dia] = dataString.split('-');
    ano = parseInt(ano);
    mes = parseInt(mes);
    dia = parseInt(dia);

    return new Date(ano, mes - 1, dia + 1 );
}

const parseTimeBD = (time) => {
    
    let horas = parseInt(time.getHours()) + 3;
    let minutos = parseInt(time.getMinutes());
    let segundos = parseInt(time.getSeconds());

    horas = horas < 10 ? '0' + horas : horas;
    minutos = minutos < 10 ? '0' + minutos : minutos;
    segundos = segundos < 10 ? '0' + segundos : segundos;
 
    return ` ${horas}:${minutos}:${segundos}`
}

module.exports = {parseDateBd, parseTimeBD};

