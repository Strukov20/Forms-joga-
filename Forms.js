                // FORM
//масив статусів
                let message = {
                    loading: 'Loading...',
                    success: 'Thank you! ',
                    failure: 'Oooops, Sorry!!!'
                };
//получаємо доступ до елементів
                let form = document.querySelector('.main-form'),
                    input = form.getElementsByTagName('input'),
                    statusMessage = document.createElement('div');
            
                    statusMessage.classList.add('status');
// функція стутусу сервера
                    form.addEventListener('submit', function(event){
                        event.preventDefault();
                        form.appendChild(statusMessage);
            
                        let request = new XMLHttpRequest();
                        request.open('POST', 'server.php');
                    //request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            
                        let formData = new FormData(form);
                        //request.send(formData);
            
                        let obg = {};
                        formData.forEach(function(value, key){
                            obg[key] = value;
                        });
                        let json = JSON.stringify(obg);
            
                        request.send(json);
            
// текущий статус
                        request.addEventListener('readystatechange', function() {
                           if (request.readyState < 4) {
                            statusMessage.innerHTML = message.loading;
                           } else if (request.readyState === 4 && request.status == 200) {
                            statusMessage.innerHTML = message.success;
                           } else {
                            statusMessage.innerHTML = message.failure;
                           }
                       });
            
                       for (let i = 0; i < input.length; i++){
                           input[i].value = '';
                       }
                    });