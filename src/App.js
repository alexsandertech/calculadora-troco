import React, { useState } from 'react';
import styled from 'styled-components';

const Limiter = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #DDD;
`;

const Box = styled.div`
  width: 350px;
  height: 300px;
  border-radius: 8px;
  background-color: #FFF;
  border-bottom: 2px solid #AAA;
  border-right: 1px solid #AAA;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const OutputArea = styled(InputArea)`
  width: 280px;
  height: 100px;
  justify-content: center;
  align-items: center;
  font-size:25px;
  color: #999
`;

const ButtonArea = styled(InputArea)`
  width: 280px;
  flex-direction: row;
  justify-content: space-between;
`;

const Input = styled.input`
  width: 180px;
  height: 35px;
  font-size: 17px;
  color: #aaa;
  border: none;
  border-bottom: 1px solid #AAA;
  align-text:right;
  margin: 20px;
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  color:#2F2F2F;
  font-size: 22px;
  margin: 20px;
`;

const Button = styled.button`
  background-color: ${props => props.color || '#0A4'};
  color: #FFF;
  font-size:15px;
  height: 35px;
  width: 105px;
  border: none;
  border-radius:5px;
  margin-top:14px;
  cursor: pointer;
`;

function App() {
  const [valorCompra, setValorCompra] = useState('');
  const [valorPago, setValorPago] = useState('');
  const [troco, setTroco] = useState('');

  var filterFloat = function (value) {
    if (/^(-|\+)?([0-9]+((\.+[0-9]+)|(\.)?)?)$/.test(value))
      return value;
    return "";
  }

  var calcPartial = function (e) {
    let valueTest = e.target.value.substr(3);
    let valueIn = filterFloat(valueTest);

    if (e.target.id === "valueCompra") {
      let partial = (parseFloat(valorPago) - parseFloat(valueIn));
      if (partial >= 0)
        setTroco(partial.toFixed(2));
      else
        setTroco("Insuficiente");

      setValorCompra(valueIn);
    } else {
      let partial = (parseFloat(valueIn) - parseFloat(valorCompra));

      if (partial >= 0)
        setTroco(partial.toFixed(2));
      else
        setTroco("Insuficiente");

      setValorPago(valueIn);
    }
  }

  var cleanInputs = function () {
    setValorPago('');
    setValorCompra('');
    setTroco('');
  }

  var calcBallot = function () {
    alert("Funcao não implementada:", troco);
  }

  return (
    <>
      <Limiter>

        <Box>
          <Title>Caluladora de Troco</Title>

          <InputArea>
            <label>
              Compra:
                <Input id="valueCompra" type="text" value={"R$ " + valorCompra} onChange={calcPartial}></Input>
            </label>
            <label>
              Pago:
                <Input id="valuePago" type="text" value={"R$ " + valorPago} onChange={calcPartial}></Input>
            </label>
          </InputArea>

          <ButtonArea>
            <Button color="#F33" onClick={cleanInputs}>Limpar</Button>
            <Button onClick={calcBallot}>Gerar notas</Button>
          </ButtonArea>

        </Box>
        <OutputArea>
          Troco: R$ {troco}
        </OutputArea>
      </Limiter>
    </>
  );
}

export default App;
