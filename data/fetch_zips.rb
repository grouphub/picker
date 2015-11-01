require 'open-uri'
require 'json'
require 'bundler/inline'



states = {
  'AL' => 'Alabama',
  'AK' => 'Alaska',
  'AS' => 'American Samoa',
  'AZ' => 'Arizona',
  'AR' => 'Arkansas',
  'CA' => 'California',
  'CO' => 'Colorado',
  'CT' => 'Connecticut',
  'DE' => 'Delaware',
  'DC' => 'District Of Columbia',
  'FM' => 'Federated States Of Micronesia',
  'FL' => 'Florida',
  'GA' => 'Georgia',
  'GU' => 'Guam',
  'HI' => 'Hawaii',
  'ID' => 'Idaho',
  'IL' => 'Illinois',
  'IN' => 'Indiana',
  'IA' => 'Iowa',
  'KS' => 'Kansas',
  'KY' => 'Kentucky',
  'LA' => 'Louisiana',
  'ME' => 'Maine',
  'MH' => 'Marshall Islands',
  'MD' => 'Maryland',
  'MA' => 'Massachusetts',
  'MI' => 'Michigan',
  'MN' => 'Minnesota',
  'MS' => 'Mississippi',
  'MO' => 'Missouri',
  'MT' => 'Montana',
  'NE' => 'Nebraska',
  'NV' => 'Nevada',
  'NH' => 'New Hampshire',
  'NJ' => 'New Jersey',
  'NM' => 'New Mexico',
  'NY' => 'New York',
  'NC' => 'North Carolina',
  'ND' => 'North Dakota',
  'MP' => 'Northern Mariana Islands',
  'OH' => 'Ohio',
  'OK' => 'Oklahoma',
  'OR' => 'Oregon',
  'PW' => 'Palau',
  'PA' => 'Pennsylvania',
  'PR' => 'Puerto Rico',
  'RI' => 'Rhode Island',
  'SC' => 'South Carolina',
  'SD' => 'South Dakota',
  'TN' => 'Tennessee',
  'TX' => 'Texas',
  'UT' => 'Utah',
  'VT' => 'Vermont',
  'VI' => 'Virgin Islands',
  'VA' => 'Virginia',
  'WA' => 'Washington',
  'WV' => 'West Virginia',
  'WI' => 'Wisconsin',
  'WY' => 'Wyoming'
}

`mkdir -p states`

states.each do |abbrev, name|
  puts "Fetching #{abbrev}"
  File.open("#{File.dirname(__FILE__)}/states/" + abbrev.downcase + '.json', 'w') do |f|
    f.puts JSON.parse(open("http://gomashup.com/json.php?fds=geo/usa/zipcode/state/#{abbrev}").read[1..-2])['result'].to_json
  end
end

zips = {}

def properize(name)
  name
    .split(/\s+/)
    .map { |n| ActiveSupport::Inflector.humanize(n) }
    .join(' ')
end

states.each do |abbrev, name|
  puts "Parsing #{abbrev}..."

  state = JSON.parse(File.read("#{File.dirname(__FILE__)}/states/#{abbrev.downcase}.json"))

  state.each do |item|
    zip = {}
    county = properize(item['County'])
    city = properize(item['City'])
    state = states[abbrev]
    zipcode = item['Zipcode']
    latitude = item['Latitude']
    longitude = item['Longitude']

    zip['county'] = county
    zip['city'] = city
    zip['abbrev'] = abbrev
    zip['state'] = state
    zip['zipcode'] = zipcode
    zip['latitude'] = latitude
    zip['longitude'] = longitude

    zips[zipcode] = zip
  end
end

puts 'Outputting zips...'

File.open("#{File.dirname(__FILE__)}/zips.json", 'w') do |f|
  f.puts(zips.to_json)
end

