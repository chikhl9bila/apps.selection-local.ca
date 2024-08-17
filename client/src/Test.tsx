import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ShowError from './components/ShowError';
function Test() {
 

  return  (
    <div>
        <ShowError visible={true} header={"hello"} message={"hola"}></ShowError>
    </div>
  );
}

export default Test;
