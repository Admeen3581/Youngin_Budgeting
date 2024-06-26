'use client';

import React from 'react'
import CountUp from 'react-countup'

const CountupAnimation = ({amount}: {amount:number}) => {

    var x = amount
    const decimalCount = x.toString.length;

  return (

    <CountUp 
        end={amount}
        prefix='$'
        decimal=','
        decimals={decimalCount/3.1}
    />
  ) 
}

export default CountupAnimation