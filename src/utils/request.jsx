function get (url, headers) {
  return fetch(url, { method: 'GET', headers: headers })
    .then(
      response => { return handleResponse(url, response) })
    .catch(
      err => {
        console.error(`Request failed. Url = ${url} . Message = ${err}`)
        return {
          error: { message: 'Request failed.' }
        }
      })
}

function post (url, headers, data) {
  return fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(
      data)
  })
    .then(
      response => { return handleResponse(url, response) })
    .catch(
      err => {
        console.error(`Request failed. Url = ${url} . Message = ${err}`)
        return {
          error: { message: 'Request failed.' }
        }
      })
}

function put (url, headers, data) {
  return fetch(url, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(
      data)
  })
    .then(
      response => { return handleResponse(url, response) })
    .catch(
      err => {
        console.error(`Request failed. Url = ${url} . Message = ${err}`)
        return {
          error: { message: 'Request failed.' }
        }
      })
}

function handleResponse (url, response) {
  if (response.status < 500) {
    return response.json()
  } else {
    console.error(
      `Request failed. Url = ${url} . Message = ${response.statusText}`)
    return {
      error: { message: 'Request failed due to server error ' }
    }
  }
}

export { get, post, put }
