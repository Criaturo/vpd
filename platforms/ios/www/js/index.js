/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var possuiConexao = false;
var analyticsIniciado = false;

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('online', this.checkConnection, false);
        document.addEventListener('offline', this.checkConnection, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        plataforma = window.device.platform;
        titulo     = document.getElementsByTagName("title")[0].innerHTML;
        
        //para mostrar a barra de suatus
        //window.plugin.statusbarOverlay.show();
        
        //removendo a status bar
        try{
            window.plugin.statusbarOverlay.isVisible( function (isVisible) {
                //console.log('status bar is visible');
                //para ocultar a barra de suatus
                window.plugin.statusbarOverlay.hide();
            });
        }
        catch(error){
            console.log('error status bar:');
            console.log(error);
        }
        
        if( plataforma.toLowerCase() == 'android' )
        {
            //utilizando analytics sdk
            window.analytics.startTrackerWithId('UA-41359132-2');
            window.analytics.trackView(titulo);

            //utilizando o analytics "convencional", para isso a conta deve ser configurada como website
            // ga_storage._setAccount('UA-41359132-2');
            // ga_storage._trackPageview(titulo);

            analyticsIniciado = true;
        }
        else if( plataforma.toLowerCase() == 'ios' )
        {
            //utilizando analytics sdk
            window.analytics.startTrackerWithId('UA-41359132-3');
            window.analytics.trackView(titulo);
            
            //utilizando o analytics "convencional", para isso a conta deve ser configurada como website
            // ga_storage._setAccount('UA-41359132-3');
            // ga_storage._trackPageview(titulo);

            analyticsIniciado = true;
        }
    },
    //verificar conexão
    checkConnection: function(){
        var networkState = navigator.connection.type;

        var states = {};
        states[networkState.UNKNOWN]  = 'Unknown connection';
        states[networkState.ETHERNET] = 'Ethernet connection';
        states[networkState.WIFI]     = 'WiFi connection';
        states[networkState.CELL_2G]  = 'Cell 2G connection';
        states[networkState.CELL_3G]  = 'Cell 3G connection';
        states[networkState.CELL_4G]  = 'Cell 4G connection';
        states[networkState.NONE]     = 'No network connection';

        if( networkState == 'unknown' || networkState == 'none' )
            possuiConexao = false;
        else
            possuiConexao = true;
    },
    //função para enviar o trackview da página atual, apenas se tiver conexão
    sendTrackPacgeView: function(){
        possuiConexao = true;
        
        console.log('conexao: ' + possuiConexao);
        
        if( possuiConexao == true )
        {
            plataforma = window.device.platform;
            titulo     = document.getElementsByTagName("title")[0].innerHTML;
            
            console.log('plataforma: ' + plataforma);
            
            if( plataforma.toLowerCase() == 'android' )
            {
                //utilizando analytics sdk
                window.analytics.startTrackerWithId('UA-41359132-2');
                window.analytics.trackView(titulo);

                //utilizando o analytics "convencional", para isso a conta deve ser configurada como website
                // ga_storage._setAccount('UA-41359132-2');
                // ga_storage._trackPageview(titulo);

                analyticsIniciado = true;
            }
            else if( plataforma.toLowerCase() == 'ios' )
            {
                //utilizando analytics sdk
                window.analytics.startTrackerWithId('UA-41359132-3');
                window.analytics.trackView(titulo);
                
                //utilizando o analytics "convencional", para isso a conta deve ser configurada como website
                // ga_storage._setAccount('UA-41359132-3');
                // ga_storage._trackPageview(titulo);

                analyticsIniciado = true;
            }
        }
    }
};

$(document).ready(function(){
    var processado = false;
    
    $('*').bind('pageload', function(){
        if( processado == false ){
            
            processado = true;
            
            try{
                app.initialize();
                app.sendTrackPacgeView();
            }
            catch(error){
                console.log(error);
            }
        }
        
        return true;
    });
});
