# Analysis (or Annotation) of Code Evolution (ACE)

ACE is a software tool to manually annotate different stages
(e.g. commits in a version control system) of evolution of a software
code repository. Abhishek Dutta (https://abhishekdutta.org) initiated
the development of ACE because he wanted to manually annotate the
different stages of evolution of the source code of word count tool
(i.e. wc) in GNU Coreutils. Such manual annotations, it is hoped, will
provide a glimpse into how a software evolves over time. The development
of ACE started on 2023-Sep-23.

## Usage
The tool requires git repositories to be server over HTTP using the
dumb protocol. For now, we use the apache web server to host a git
repository over HTTP. In future, we will created a minimal web server
`ace-serve` that will avoid the need to run a full web server.

```
sudo apt-get install apache2
cd /home/tlm/code/ace/repo
git clone --bare /home/tlm/pub/lion/code/gnu-coreutils/git-src/coreutils coreutils.git
cd coreutils.git/
mv hooks/post-update.sample hooks/post-update
chmod a+x hooks/post-update

# make the git repository files accessible at http://localhost/coreutils.git/
cd /var/www/html/
sudo ln -s /home/tlm/code/ace/ ace
```