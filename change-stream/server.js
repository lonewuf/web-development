    // const express = require('express');
    // const bodyParser = require('body-parser');
    // const mongoose = require('mongoose');
    // const api = require('./routes/api');
    // const Pusher = require('pusher');
    
const express       = require('express'),
      bodyParser    = require('body-parser'),
      mongoose      = require('mongoose'),
      api           = require('./routes/api'),
      Pusher        = require('pusher')
      
const pusher = new Pusher({
      appId: '745447',
      key: '0bb98fbaf70b009c4b58',
      secret: '0df291daabc4bd23902c',
      cluster: 'ap1',
      encrypted: true
});
const channel = 'entryexits';