BEGIN {
  RS = "\r\n\r\n"
}

function printFields(label) {
  firstItem = 3
  step = 2
  separator = ","

  if (NF == 1) {
    printf(label "\n")
  } else {
    printf(label separator)
  }
  


  for (i=firstItem; i<=NF; i=i+step) {
    if (i == NF) {
      separator = "\n"
    }
    printf(substr($i, 2, length($i)-2) separator)
  }
}

$0 ~ /^core.ignore.recursive=/ {
  printFields("recursive")
}

$0 ~ /^core.ignore=/ {
  printFields("plain")
}