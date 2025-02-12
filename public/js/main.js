const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-thumbs-up')

Array.from(deleteText).forEach(element => {
  element.addEventListener('click', deletePlant)
});

Array.from(thumbText).forEach(element => {
  element.addEventListener('click', addLike)
});

async function deletePlant() {
  const plantName = this.parentNode.childNodes[1].innerText
  const varietyName = this.parentNode.childNodes[3].innerText
  try {
    const response = await fetch('deletePlant', {
      method: 'delete', 
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify({
        'plant': plantName, 
        'variety': varietyName
      })
    })

    const data = await response.json()
    console.log(data)
    location.reload()
  } catch (err) {
    console.log(err)
  }
}

async function addLike() {
  const plantName = this.parentNode.childNodes[1].innerText
  const varietyName = this.parentNode.childNodes[3].innerText
  const likes = Number(this.parentNode.childNodes[5].innerText)
  try{
    const response = await fetch('addOneLike', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'plant': plantName, 
        'variety': varietyName, 
        'likes': likes
      })
    })
    const data = await response.json()
    console.log(data)
    location.reload()
  }catch(err) {
    console.log(err)
  }
}