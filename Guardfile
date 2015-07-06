guard 'bundler' do
  watch('Gemfile')
  # Uncomment next line if Gemfile contain `gemspec' command
  # watch(/^.+\.gemspec/)
end

# Buster.JS laufen lassen
guard 'shell' do
  watch(/(js|spec)\/(.*).js/) {|m| `buster test --reporter specification` }
end
